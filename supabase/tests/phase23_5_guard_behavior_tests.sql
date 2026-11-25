-- Phase 23.5 / 23.7 executable guard behavior tests (isolated transaction).
-- Requires: foundation migrations + 20261002000000_leads_integration_guards.sql applied.
-- Rolls back all data changes. Run: psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f this-file.sql
--
-- Limitations without Supabase local stack:
--   * Supabase roles (authenticated) may be missing on plain PostgreSQL.
--   * Browser-path cases skip instead of false-passing when SET ROLE fails.

begin;

do $core$
declare
  v_discovered uuid;
  v_lead_id uuid;
  v_lead_id_b uuid;
  v_source_id uuid;
begin
  if to_regprocedure('public.leads_guard_lifecycle()') is null then
    raise exception 'SKIP: integration guards not installed';
  end if;

  select id into v_discovered
  from public.lead_statuses
  where key = 'discovered'
    and archived_at is null
    and is_terminal = false
  limit 1;
  if v_discovered is null then
    raise exception 'SKIP: active discovered status is missing';
  end if;

  -- Case 1: unclaimed lead insert (integration-style, postgres session)
  insert into public.leads (display_name, status_id, owner_user_id, created_by, merged_into_lead_id)
  values ('phase237 unclaimed lead', v_discovered, null, null, null)
  returning id into v_lead_id;

  if not exists (select 1 from public.leads where id = v_lead_id) then
    raise exception 'unclaimed insert did not create a lead';
  end if;

  insert into public.leads (display_name, status_id, owner_user_id, created_by, merged_into_lead_id)
  values ('phase237 unclaimed lead b', v_discovered, null, null, null)
  returning id into v_lead_id_b;

  create temp table if not exists phase237_duplicate_pair (
    lead_low_id uuid not null,
    lead_high_id uuid not null,
    constraint phase237_duplicate_pair_ordered check (lead_low_id < lead_high_id)
  ) on commit drop;

  delete from phase237_duplicate_pair;
  insert into phase237_duplicate_pair (lead_low_id, lead_high_id)
  values (
    least(v_lead_id, v_lead_id_b),
    greatest(v_lead_id, v_lead_id_b)
  );

  -- Case 3: archive consistency mismatch (23514)
  begin
    insert into public.leads (display_name, status_id, owner_user_id, archived_at)
    values ('phase237 bad archive', v_discovered, null, pg_catalog.now());
    raise exception 'expected SQLSTATE 23514 on archive/status mismatch';
  exception
    when sqlstate '23514' then
      null;
  end;

  -- Case 5 (postgres path): direct social identity insert allowed for non-browser role
  select id into v_source_id from public.lead_sources limit 1;
  if v_source_id is not null then
    insert into public.social_identities (
      lead_id, source_id, external_id, handle, profile_url, display_name
    ) values (
      v_lead_id, v_source_id, 'phase237-ext-' || v_lead_id::text,
      'phase237handle', 'https://example.test/profile', 'Phase 237 Identity'
    );
  end if;

  raise notice 'Phase 23.7 core behavior (postgres session): PASS';
end
$core$;

do $browser$
declare
  v_discovered uuid;
  v_source_id uuid;
  v_lead_id uuid;
  v_lead_low uuid;
  v_lead_high uuid;
  v_role_ok boolean := false;
begin
  if to_regprocedure('public.leads_guard_lifecycle()') is null then
    raise notice 'SKIP browser cases: guards missing';
    return;
  end if;

  -- Fixture owned by postgres session role; read before SET ROLE for Case 7.
  select lead_low_id, lead_high_id into v_lead_low, v_lead_high from phase237_duplicate_pair;
  if v_lead_low is null or v_lead_high is null then
    raise exception 'duplicate pair fixture missing';
  end if;

  begin
    execute 'set local role authenticated';
    v_role_ok := true;
  exception
    when others then
      raise notice 'SKIP browser cases: cannot SET ROLE authenticated (%)', sqlerrm;
      return;
  end;

  select id into v_discovered
  from public.lead_statuses
  where key = 'discovered' and archived_at is null and is_terminal = false
  limit 1;

  -- Case 2: browser direct insert with archived_at set (22023)
  begin
    insert into public.leads (display_name, status_id, owner_user_id, archived_at, created_by)
    values ('phase237 browser archived', v_discovered, null, pg_catalog.now(), auth.uid());
    raise exception 'expected SQLSTATE 22023 for browser archived insert';
  exception
    when sqlstate '22023' then
      null;
  end;

  -- Case 6: activity guard (42501)
  select id into v_lead_id from public.leads limit 1;
  if v_lead_id is not null then
    begin
      insert into public.lead_activities (lead_id, actor_user_id, activity_type, metadata)
      values (v_lead_id, auth.uid(), 'note_added', '{}'::jsonb);
      raise exception 'expected SQLSTATE 42501 for browser activity insert';
    exception
      when sqlstate '42501' then
        null;
    end;
  end if;

  -- Case 5: child table direct write (42501)
  select id into v_source_id from public.lead_sources limit 1;
  if v_lead_id is not null and v_source_id is not null then
    begin
      insert into public.social_identities (
        lead_id, source_id, external_id
      ) values (
        v_lead_id, v_source_id, 'phase237-browser-' || v_lead_id::text
      );
      raise exception 'expected SQLSTATE 42501 for browser identity insert';
    exception
      when sqlstate '42501' then
        null;
    end;
  end if;

  -- Case 7: authenticated INSERT with status merged must hit leads_guard_duplicate_review (42501), not CHECK ordering.
  begin
    insert into public.duplicate_candidates (lead_low_id, lead_high_id, status)
    values (v_lead_low, v_lead_high, 'merged');
    raise exception 'expected SQLSTATE 42501 for merged duplicate insert';
  exception
    when sqlstate '42501' then
      null;
  end;

  if v_role_ok then
    reset role;
  end if;
  raise notice 'Phase 23.7 browser behavior: PASS';
end
$browser$;

rollback;