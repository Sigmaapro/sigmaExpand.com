-- Atomic lead merge.
-- social_identities.lead_id and lead_notes.lead_id are immutable outside a merge,
-- and lead_activities has no client update grant. A security definer function is
-- the only way to move that child data and the merge pointer in one transaction.
-- The session flag is transaction-local and is set only inside leads_merge_pair.

create or replace function public.leads_guard_social_identity()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
begin
  if new.lead_id is distinct from old.lead_id
    and coalesce(current_setting('leads.merge_in_progress', true), '') is distinct from 'on' then
    raise exception 'social identity lead_id is immutable' using errcode = '42501';
  end if;

  if new.external_id is distinct from old.external_id then
    raise exception 'social identity external_id is immutable' using errcode = '42501';
  end if;

  if new.source_id is distinct from old.source_id
    and not public.leads_has_permission('sources.manage') then
    raise exception 'social identity source_id is immutable' using errcode = '42501';
  end if;

  if new.is_active is distinct from old.is_active
    and not public.leads_has_permission('sources.manage')
    and not exists (
      select 1
      from public.source_assignments as assignment
      where assignment.source_id = new.source_id
        and assignment.user_id = (select auth.uid())
    ) then
    raise exception 'social identity visibility change is not permitted' using errcode = '42501';
  end if;

  return new;
end;
$$;

create or replace function public.leads_guard_note()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
begin
  if new.id is distinct from old.id then
    raise exception 'note id is immutable' using errcode = '42501';
  end if;

  if new.lead_id is distinct from old.lead_id
    and coalesce(current_setting('leads.merge_in_progress', true), '') is distinct from 'on' then
    raise exception 'note lead_id is immutable' using errcode = '42501';
  end if;

  if new.author_user_id is distinct from old.author_user_id then
    raise exception 'note author is immutable' using errcode = '42501';
  end if;

  if new.created_at is distinct from old.created_at then
    raise exception 'note created_at is immutable' using errcode = '42501';
  end if;

  return new;
end;
$$;

create or replace function public.leads_merge_lead_snapshot(target_lead_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = pg_catalog, public, pg_temp
as $$
  select jsonb_build_object(
    'id', lead.id,
    'display_name', lead.display_name,
    'owner_user_id', lead.owner_user_id,
    'merged', lead.merged_into_lead_id is not null,
    'archived', lead.archived_at is not null,
    'note_count', (
      select count(*)::integer
      from public.lead_notes as note
      where note.lead_id = lead.id
    ),
    'activity_count', (
      select count(*)::integer
      from public.lead_activities as activity
      where activity.lead_id = lead.id
    ),
    'identities', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'platform', coalesce(source.name, 'Source'),
          'handle', identity.handle,
          'external_id', identity.external_id
        )
        order by source.name, identity.handle
      )
      from public.social_identities as identity
      left join public.lead_sources as source on source.id = identity.source_id
      where identity.lead_id = lead.id
    ), '[]'::jsonb)
  )
  from public.leads as lead
  where lead.id = target_lead_id;
$$;

create or replace function public.leads_merge_preview(p_candidate_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = pg_catalog, public, pg_temp
as $$
declare
  candidate public.duplicate_candidates%rowtype;
  conflicts jsonb;
begin
  if (select auth.uid()) is null or not public.leads_has_permission('duplicates.review') then
    raise exception 'lead merge is not permitted' using errcode = '42501';
  end if;

  select *
    into candidate
  from public.duplicate_candidates
  where id = p_candidate_id;

  if not found then
    raise exception 'duplicate review not found' using errcode = 'P0002';
  end if;

  if not public.leads_can_read_lead(candidate.lead_low_id)
    or not public.leads_can_read_lead(candidate.lead_high_id) then
    raise exception 'lead merge is not permitted' using errcode = '42501';
  end if;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'platform', coalesce(source.name, 'Source'),
      'handle', losing.handle,
      'external_id', losing.external_id
    )
  ), '[]'::jsonb)
    into conflicts
  from public.social_identities as losing
  join public.social_identities as existing
    on existing.source_id = losing.source_id
   and existing.external_id = losing.external_id
   and existing.lead_id <> losing.lead_id
  left join public.lead_sources as source on source.id = losing.source_id
  where losing.lead_id = candidate.lead_low_id
    and existing.lead_id = candidate.lead_high_id;

  return jsonb_build_object(
    'low', public.leads_merge_lead_snapshot(candidate.lead_low_id),
    'high', public.leads_merge_lead_snapshot(candidate.lead_high_id),
    'conflicts', conflicts
  );
end;
$$;

create or replace function public.leads_merge_pair(
  p_candidate_id uuid,
  p_survivor_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
declare
  actor uuid := auth.uid();
  candidate public.duplicate_candidates%rowtype;
  loser_id uuid;
  survivor public.leads%rowtype;
  loser public.leads%rowtype;
  conflict_lead uuid;
  identity_count integer := 0;
  note_count integer := 0;
  activity_count integer := 0;
  history_id uuid;
begin
  if actor is null or not public.leads_has_permission('duplicates.review') then
    raise exception 'lead merge is not permitted' using errcode = '42501';
  end if;

  select *
    into candidate
  from public.duplicate_candidates
  where id = p_candidate_id
  for update;

  if not found or candidate.status is distinct from 'pending' then
    raise exception 'This duplicate review is no longer pending.' using errcode = 'P0002';
  end if;

  if p_survivor_id is distinct from candidate.lead_low_id
    and p_survivor_id is distinct from candidate.lead_high_id then
    raise exception 'Choose the lead that should remain.' using errcode = '22023';
  end if;

  loser_id := case
    when p_survivor_id = candidate.lead_low_id then candidate.lead_high_id
    else candidate.lead_low_id
  end;

  if p_survivor_id = loser_id then
    raise exception 'lead merge cycle is not permitted' using errcode = '42501';
  end if;

  if p_survivor_id < loser_id then
    select * into survivor from public.leads where id = p_survivor_id for update;
    if not found then
      raise exception 'lead merge target does not exist' using errcode = '42501';
    end if;
    select * into loser from public.leads where id = loser_id for update;
    if not found then
      raise exception 'lead merge target does not exist' using errcode = '42501';
    end if;
  else
    select * into loser from public.leads where id = loser_id for update;
    if not found then
      raise exception 'lead merge target does not exist' using errcode = '42501';
    end if;
    select * into survivor from public.leads where id = p_survivor_id for update;
    if not found then
      raise exception 'lead merge target does not exist' using errcode = '42501';
    end if;
  end if;

  if not public.leads_can_read_lead(survivor.id)
    or not public.leads_can_read_lead(loser.id)
    or not public.leads_can_write_lead(survivor.id)
    or not public.leads_can_write_lead(loser.id) then
    raise exception 'lead merge is not permitted' using errcode = '42501';
  end if;

  if survivor.merged_into_lead_id is not null or loser.merged_into_lead_id is not null then
    raise exception 'A merged lead cannot be merged again.' using errcode = '42501';
  end if;

  if survivor.archived_at is not null or loser.archived_at is not null then
    raise exception 'Only active leads can be merged.' using errcode = '42501';
  end if;

  select existing.lead_id
    into conflict_lead
  from public.social_identities as moving
  join public.social_identities as existing
    on existing.source_id = moving.source_id
   and existing.external_id = moving.external_id
   and existing.lead_id <> moving.lead_id
  where moving.lead_id = loser.id
  limit 1;

  if conflict_lead is not null then
    if conflict_lead = survivor.id then
      raise exception 'Merge cannot continue because this identity already exists on the surviving Lead.'
        using errcode = '23505';
    end if;
    raise exception 'Merge cannot continue because this identity already exists on another Lead.'
      using errcode = '23505';
  end if;

  select count(*) into identity_count from public.social_identities where lead_id = loser.id;
  select count(*) into note_count from public.lead_notes where lead_id = loser.id;
  select count(*) into activity_count from public.lead_activities where lead_id = loser.id;

  perform set_config('leads.merge_in_progress', 'on', true);

  begin
    update public.social_identities
      set lead_id = survivor.id
      where lead_id = loser.id;
  exception
    when unique_violation then
      raise exception 'Merge cannot continue because this identity already exists on the surviving Lead.'
        using errcode = '23505';
  end;

  update public.lead_notes
    set lead_id = survivor.id
    where lead_id = loser.id;

  update public.lead_activities
    set lead_id = survivor.id
    where lead_id = loser.id;

  -- Owner is never copied. The selected survivor keeps its own owner.
  update public.leads
    set merged_into_lead_id = survivor.id
    where id = loser.id
      and merged_into_lead_id is null;

  if not found then
    raise exception 'lead merge is not permitted' using errcode = '42501';
  end if;

  select history.id
    into history_id
  from public.merge_history as history
  where history.survivor_lead_id = survivor.id
    and history.merged_lead_id = loser.id
    and history.actor_user_id = actor
  order by history.created_at desc
  limit 1;

  if history_id is null then
    raise exception 'lead merge history was not recorded' using errcode = '42501';
  end if;

  update public.merge_history
    set metadata = jsonb_build_object(
      'identities_transferred', identity_count,
      'notes_transferred', note_count,
      'activities_transferred', activity_count,
      'candidate_id', p_candidate_id
    )
    where id = history_id;

  insert into public.lead_activities (
    lead_id,
    actor_user_id,
    activity_type,
    metadata
  )
  values (
    survivor.id,
    actor,
    'lead_merged',
    jsonb_build_object('merged_lead_id', loser.id)
  );

  update public.duplicate_candidates
    set status = 'merged',
        reviewed_by = actor,
        reviewed_at = now()
    where id = candidate.id
      and status = 'pending';

  if not found then
    raise exception 'This duplicate review is no longer pending.' using errcode = 'P0002';
  end if;

  perform set_config('leads.merge_in_progress', 'off', true);

  return jsonb_build_object(
    'survivor_id', survivor.id,
    'merged_id', loser.id,
    'identities_transferred', identity_count,
    'notes_transferred', note_count,
    'activities_transferred', activity_count
  );
end;
$$;

revoke all on function public.leads_merge_lead_snapshot(uuid) from public, anon, authenticated;
revoke all on function public.leads_merge_preview(uuid) from public, anon;
revoke all on function public.leads_merge_pair(uuid, uuid) from public, anon;

grant execute on function public.leads_merge_preview(uuid) to authenticated;
grant execute on function public.leads_merge_pair(uuid, uuid) to authenticated;
