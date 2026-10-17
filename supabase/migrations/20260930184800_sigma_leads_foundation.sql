-- SIGMA Leads foundation.
-- Does not alter public.profiles, public.board_announcements, public.board_meetings,
-- or public.is_board_admin().
-- Does not create auth users, leads, or provider credentials.
-- lead_sources.config and system_settings.value must never store secrets.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.leads_set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog, pg_temp
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

create or replace function public.leads_capabilities_ok(capabilities text[])
returns boolean
language sql
immutable
set search_path = pg_catalog, pg_temp
as $$
  select capabilities <@ array[
    'search_profiles',
    'search_keywords',
    'search_hashtags',
    'fetch_profile',
    'fetch_recent_posts',
    'fetch_recent_reels',
    'fetch_metrics'
  ]::text[];
$$;

-- ---------------------------------------------------------------------------
-- RBAC. Independent of profiles.role and profiles.internal_role.
-- ---------------------------------------------------------------------------

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text,
  is_system boolean not null default false,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint roles_key_format check (key ~ '^[a-z][a-z0-9_]*$'),
  constraint roles_name_present check (char_length(btrim(name)) > 0)
);

create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  description text,
  created_at timestamptz not null default now(),
  constraint permissions_key_format check (key ~ '^[a-z][a-z0-9_.]*$')
);

create table public.role_permissions (
  role_id uuid not null references public.roles (id) on delete cascade,
  permission_id uuid not null references public.permissions (id) on delete cascade,
  primary key (role_id, permission_id)
);

create table public.user_roles (
  user_id uuid not null references auth.users (id) on delete cascade,
  role_id uuid not null references public.roles (id) on delete cascade,
  primary key (user_id, role_id)
);

create index idx_user_roles_role_id on public.user_roles (role_id);

create or replace function public.leads_has_permission(permission_key text)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, pg_temp
as $$
  select exists (
    select 1
    from public.user_roles as user_role
    join public.roles as role
      on role.id = user_role.role_id
     and role.archived_at is null
    join public.role_permissions as role_permission
      on role_permission.role_id = role.id
    join public.permissions as permission
      on permission.id = role_permission.permission_id
    where user_role.user_id = auth.uid()
      and permission.key = permission_key
  );
$$;

comment on function public.leads_has_permission(text) is
  'SIGMA Leads RBAC check for auth.uid(). Does not use profiles.internal_role or is_board_admin().';

-- ---------------------------------------------------------------------------
-- Sources and statuses
-- ---------------------------------------------------------------------------

create table public.lead_sources (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  provider_key text,
  capabilities text[] not null default '{}',
  config jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lead_sources_key_format check (key ~ '^[a-z][a-z0-9_]*$'),
  constraint lead_sources_name_present check (char_length(btrim(name)) > 0),
  constraint lead_sources_capabilities_known check (public.leads_capabilities_ok(capabilities)),
  constraint lead_sources_config_object check (jsonb_typeof(config) = 'object'),
  constraint lead_sources_archive_inactive check (archived_at is null or is_active = false)
);

comment on column public.lead_sources.config is
  'Non-secret provider options only. Never store API keys, tokens, or client secrets.';

create table public.source_assignments (
  source_id uuid not null references public.lead_sources (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (source_id, user_id)
);

create index idx_source_assignments_user_id on public.source_assignments (user_id);

create table public.lead_statuses (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  sort_order integer not null,
  is_terminal boolean not null default false,
  is_system boolean not null default false,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lead_statuses_key_format check (key ~ '^[a-z][a-z0-9_]*$'),
  constraint lead_statuses_label_present check (char_length(btrim(label)) > 0)
);

-- ---------------------------------------------------------------------------
-- Leads and identities
-- ---------------------------------------------------------------------------

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  status_id uuid not null references public.lead_statuses (id) on delete restrict,
  owner_user_id uuid references auth.users (id) on delete set null,
  language text,
  region text,
  discovered_at timestamptz not null default now(),
  merged_into_lead_id uuid references public.leads (id) on delete restrict,
  archived_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_display_name_present check (char_length(btrim(display_name)) between 1 and 200),
  constraint leads_not_merged_into_self check (merged_into_lead_id is null or merged_into_lead_id <> id)
);

create index idx_leads_owner_user_id on public.leads (owner_user_id);
create index idx_leads_status_id on public.leads (status_id);
create index idx_leads_discovered_at on public.leads (discovered_at desc);
create index idx_leads_archived_at on public.leads (archived_at);

create table public.social_identities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete restrict,
  source_id uuid not null references public.lead_sources (id) on delete restrict,
  external_id text not null,
  handle text,
  profile_url text,
  display_name text,
  bio text,
  is_active boolean not null default true,
  discovered_at timestamptz not null default now(),
  last_synced_at timestamptz,
  profile_meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint social_identities_external_id_present check (char_length(btrim(external_id)) > 0),
  constraint social_identities_meta_object check (jsonb_typeof(profile_meta) = 'object'),
  constraint social_identities_source_external_unique unique (source_id, external_id)
);

create index idx_social_identities_lead_id on public.social_identities (lead_id);
create index idx_social_identities_source_id on public.social_identities (source_id);
create index idx_social_identities_external_id on public.social_identities (external_id);

-- Read access: owner, an active identity on an assigned source,
-- or an operator with leads.assign / sources.manage.
-- created_by does not grant access. Source assignment does not grant write.
create or replace function public.leads_can_read_lead(target_lead_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, pg_temp
as $$
  select
    public.leads_has_permission('leads.read')
    and exists (
      select 1
      from public.leads as lead
      where lead.id = target_lead_id
        and (
          lead.owner_user_id = (select auth.uid())
          or public.leads_has_permission('leads.assign')
          or public.leads_has_permission('sources.manage')
          or exists (
            select 1
            from public.social_identities as identity
            join public.source_assignments as assignment
              on assignment.source_id = identity.source_id
            where identity.lead_id = lead.id
              and identity.is_active = true
              and assignment.user_id = (select auth.uid())
          )
        )
    );
$$;

-- Write access: current owner, or leads.assign.
-- Source assignment and created_by are intentionally absent.
create or replace function public.leads_can_write_lead(target_lead_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, pg_temp
as $$
  select
    public.leads_has_permission('leads.write')
    and exists (
      select 1
      from public.leads as lead
      where lead.id = target_lead_id
        and (
          lead.owner_user_id = (select auth.uid())
          or public.leads_has_permission('leads.assign')
        )
    );
$$;

-- ---------------------------------------------------------------------------
-- CRM history
-- ---------------------------------------------------------------------------

create table public.lead_owner_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete restrict,
  from_user_id uuid references auth.users (id) on delete set null,
  to_user_id uuid references auth.users (id) on delete set null,
  actor_user_id uuid references auth.users (id) on delete set null,
  reason text,
  created_at timestamptz not null default now(),
  constraint lead_owner_events_owner_changed check (from_user_id is distinct from to_user_id)
);

create index idx_lead_owner_events_lead_id on public.lead_owner_events (lead_id, created_at desc);

create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete restrict,
  author_user_id uuid references auth.users (id) on delete set null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lead_notes_body_present check (char_length(btrim(body)) > 0)
);

create index idx_lead_notes_lead_id on public.lead_notes (lead_id, created_at desc);

create table public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete restrict,
  actor_user_id uuid references auth.users (id) on delete set null,
  activity_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint lead_activities_type_present check (char_length(btrim(activity_type)) > 0),
  constraint lead_activities_metadata_object check (jsonb_typeof(metadata) = 'object'),
  constraint lead_activities_attribution check (
    (
      actor_user_id is not null
      and not pg_catalog.starts_with(activity_type, 'system.')
    )
    or (
      actor_user_id is null
      and pg_catalog.starts_with(activity_type, 'system.')
    )
  )
);

create index idx_lead_activities_lead_id on public.lead_activities (lead_id, created_at desc);

create table public.lead_metrics (
  id uuid primary key default gen_random_uuid(),
  social_identity_id uuid not null references public.social_identities (id) on delete restrict,
  metric_key text not null,
  value_numeric numeric,
  captured_at timestamptz not null,
  source text,
  created_at timestamptz not null default now(),
  constraint lead_metrics_key_present check (char_length(btrim(metric_key)) > 0)
);

create index idx_lead_metrics_social_identity_id on public.lead_metrics (social_identity_id);
create index idx_lead_metrics_captured_at on public.lead_metrics (captured_at desc);

create table public.lead_content (
  id uuid primary key default gen_random_uuid(),
  social_identity_id uuid not null references public.social_identities (id) on delete restrict,
  external_id text not null,
  url text,
  content_type text,
  caption text,
  published_at timestamptz,
  like_count numeric,
  comment_count numeric,
  view_count numeric,
  fetched_at timestamptz,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint lead_content_external_id_present check (char_length(btrim(external_id)) > 0),
  constraint lead_content_type_known check (
    content_type is null or content_type in ('post', 'reel', 'video', 'other')
  ),
  constraint lead_content_meta_object check (jsonb_typeof(meta) = 'object'),
  constraint lead_content_identity_external_unique unique (social_identity_id, external_id)
);

create index idx_lead_content_social_identity_id on public.lead_content (social_identity_id);
create index idx_lead_content_published_at on public.lead_content (published_at desc);

create table public.lead_ai_insights (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete restrict,
  score numeric,
  summary text,
  outreach_tips text,
  model_key text,
  context_identity_ids uuid[] not null default '{}',
  context_content_ids uuid[] not null default '{}',
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index idx_lead_ai_insights_lead_id on public.lead_ai_insights (lead_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Duplicates and merges
-- ---------------------------------------------------------------------------

create table public.duplicate_candidates (
  id uuid primary key default gen_random_uuid(),
  lead_low_id uuid not null references public.leads (id) on delete restrict,
  lead_high_id uuid not null references public.leads (id) on delete restrict,
  confidence numeric,
  reason text,
  evidence jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  reviewed_by uuid references auth.users (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint duplicate_candidates_ordered_pair check (lead_low_id < lead_high_id),
  constraint duplicate_candidates_pair_unique unique (lead_low_id, lead_high_id),
  constraint duplicate_candidates_confidence_range check (
    confidence is null or (confidence >= 0 and confidence <= 1)
  ),
  constraint duplicate_candidates_status_known check (
    status in ('pending', 'merged', 'kept_separate')
  ),
  constraint duplicate_candidates_evidence_object check (jsonb_typeof(evidence) = 'object'),
  constraint duplicate_candidates_review_fields check (
    (status = 'pending' and reviewed_at is null and reviewed_by is null)
    or (
      status <> 'pending'
      and reviewed_at is not null
      and reviewed_by is not null
    )
  )
);

create index idx_duplicate_candidates_status on public.duplicate_candidates (status);

create table public.merge_history (
  id uuid primary key default gen_random_uuid(),
  survivor_lead_id uuid not null references public.leads (id) on delete restrict,
  merged_lead_id uuid not null references public.leads (id) on delete restrict,
  actor_user_id uuid references auth.users (id) on delete set null,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint merge_history_distinct_leads check (survivor_lead_id <> merged_lead_id),
  constraint merge_history_metadata_object check (jsonb_typeof(metadata) = 'object')
);

create index idx_merge_history_survivor on public.merge_history (survivor_lead_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Access reviews, logs, jobs, settings
-- ---------------------------------------------------------------------------

create table public.signup_reviews (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  display_name text,
  status text not null default 'pending_review',
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id) on delete set null,
  rejection_note text,
  auth_user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint signup_reviews_email_shape check (
    char_length(email) between 3 and 320
    and position('@' in email) > 1
  ),
  constraint signup_reviews_status_known check (
    status in ('pending_review', 'approved', 'rejected')
  ),
  constraint signup_reviews_pending_unreviewed check (
    status <> 'pending_review' or (reviewed_at is null and reviewed_by is null and auth_user_id is null)
  )
);

create unique index idx_signup_reviews_one_pending_email
  on public.signup_reviews (lower(email))
  where status = 'pending_review';

create index idx_signup_reviews_status on public.signup_reviews (status);
create index idx_signup_reviews_email on public.signup_reviews (lower(email));

create table public.login_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text,
  success boolean not null,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index idx_login_logs_user_id on public.login_logs (user_id, created_at desc);
create index idx_login_logs_created_at on public.login_logs (created_at desc);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint audit_logs_action_present check (char_length(btrim(action)) > 0),
  constraint audit_logs_metadata_object check (jsonb_typeof(metadata) = 'object')
);

create index idx_audit_logs_actor_user_id on public.audit_logs (actor_user_id, created_at desc);
create index idx_audit_logs_entity_type on public.audit_logs (entity_type);
create index idx_audit_logs_entity_id on public.audit_logs (entity_id);
create index idx_audit_logs_created_at on public.audit_logs (created_at desc);

create table public.import_jobs (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references auth.users (id) on delete set null,
  status text not null,
  file_path text,
  summary jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint import_jobs_status_known check (
    status in (
      'uploaded',
      'validated',
      'awaiting_confirm',
      'processing',
      'completed',
      'failed',
      'cancelled'
    )
  ),
  constraint import_jobs_summary_object check (jsonb_typeof(summary) = 'object')
);

create index idx_import_jobs_created_by on public.import_jobs (created_by, created_at desc);

create table public.export_jobs (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references auth.users (id) on delete set null,
  status text not null,
  file_path text,
  filters jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  constraint export_jobs_status_known check (
    status in ('requested', 'processing', 'ready', 'failed', 'expired')
  ),
  constraint export_jobs_filters_object check (jsonb_typeof(filters) = 'object')
);

create index idx_export_jobs_created_by on public.export_jobs (created_by, created_at desc);

create table public.competitors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint competitors_name_present check (char_length(btrim(name)) > 0)
);

create table public.system_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  description text,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now(),
  constraint system_settings_key_format check (key ~ '^[a-z][a-z0-9_.]*$'),
  constraint system_settings_value_object check (jsonb_typeof(value) = 'object')
);

comment on table public.system_settings is
  'Non-secret SIGMA Leads settings. Never store API keys, tokens, or passwords.';

-- ---------------------------------------------------------------------------
-- Ownership and timestamp guards
-- ---------------------------------------------------------------------------

create or replace function public.leads_guard_sensitive_update()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
declare
  cursor_id uuid;
  parent_id uuid;
  steps integer := 0;
  claim_only boolean;
begin
  if new.id is distinct from old.id then
    raise exception 'lead id is immutable' using errcode = '42501';
  end if;

  if new.created_by is distinct from old.created_by then
    raise exception 'lead created_by is immutable' using errcode = '42501';
  end if;

  if new.created_at is distinct from old.created_at then
    raise exception 'lead created_at is immutable' using errcode = '42501';
  end if;

  -- Source readers are not writers. A claim may change only the owner.
  claim_only := not public.leads_can_write_lead(old.id);

  if claim_only then
    if not (
      public.leads_has_permission('leads.write')
      and public.leads_has_permission('leads.claim')
      and public.leads_can_read_lead(old.id)
      and old.owner_user_id is null
      and new.owner_user_id is not distinct from (select auth.uid())
    ) then
      raise exception 'lead update is not permitted' using errcode = '42501';
    end if;

    if new.display_name is distinct from old.display_name
      or new.status_id is distinct from old.status_id
      or new.language is distinct from old.language
      or new.region is distinct from old.region
      or new.discovered_at is distinct from old.discovered_at
      or new.merged_into_lead_id is distinct from old.merged_into_lead_id
      or new.archived_at is distinct from old.archived_at
    then
      raise exception 'claim cannot modify other lead fields' using errcode = '42501';
    end if;
  end if;

  if new.owner_user_id is distinct from old.owner_user_id then
    if old.owner_user_id is null and new.owner_user_id is not distinct from (select auth.uid()) then
      if not (
        public.leads_has_permission('leads.claim')
        or public.leads_has_permission('leads.assign')
      ) then
        raise exception 'lead claim is not permitted' using errcode = '42501';
      end if;
    elsif not public.leads_has_permission('leads.assign') then
      raise exception 'lead assignment is not permitted' using errcode = '42501';
    end if;
  end if;

  if new.merged_into_lead_id is distinct from old.merged_into_lead_id then
    if not public.leads_has_permission('duplicates.review') then
      raise exception 'lead merge is not permitted' using errcode = '42501';
    end if;
    if (select auth.uid()) is null then
      raise exception 'lead merge requires a user' using errcode = '42501';
    end if;
    if old.merged_into_lead_id is not null or new.merged_into_lead_id is null then
      raise exception 'lead merge pointer can only be set once' using errcode = '42501';
    end if;

    cursor_id := new.merged_into_lead_id;
    while cursor_id is not null loop
      steps := steps + 1;
      if steps > 100 or cursor_id = new.id then
        raise exception 'lead merge cycle is not permitted' using errcode = '42501';
      end if;
      select lead.merged_into_lead_id
        into parent_id
        from public.leads as lead
        where lead.id = cursor_id
        for update;
      if not found then
        raise exception 'lead merge target does not exist' using errcode = '42501';
      end if;
      cursor_id := parent_id;
    end loop;

    insert into public.merge_history (
      survivor_lead_id,
      merged_lead_id,
      actor_user_id,
      reason
    )
    values (new.merged_into_lead_id, new.id, (select auth.uid()), null);
  end if;

  return new;
end;
$$;

create or replace function public.leads_guard_social_identity()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
begin
  if new.lead_id is distinct from old.lead_id then
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

  if new.lead_id is distinct from old.lead_id then
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

create or replace function public.leads_guard_content()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
begin
  if new.social_identity_id is distinct from old.social_identity_id then
    raise exception 'content social_identity_id is immutable' using errcode = '42501';
  end if;

  return new;
end;
$$;

create or replace function public.leads_guard_last_admin()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
declare
  admin_role_id uuid;
  remaining bigint;
begin
  select role.id
    into admin_role_id
    from public.roles as role
    where role.key = 'admin'
      and role.archived_at is null
    for update;

  if admin_role_id is null or old.role_id is distinct from admin_role_id then
    return old;
  end if;

  select count(*)
    into remaining
    from public.user_roles as granted_role
    where granted_role.role_id = admin_role_id;

  if remaining <= 1 then
    raise exception 'cannot remove the last admin' using errcode = '42501';
  end if;

  return old;
end;
$$;

create or replace function public.leads_guard_admin_permission()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
begin
  if exists (
    select 1
    from public.roles as role
    join public.permissions as permission
      on permission.id = old.permission_id
    where role.id = old.role_id
      and role.key = 'admin'
      and permission.key = 'admin.roles'
  ) then
    raise exception 'cannot remove admin.roles from the admin role' using errcode = '42501';
  end if;

  return old;
end;
$$;

create or replace function public.leads_record_owner_event()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
begin
  if tg_op = 'INSERT' then
    if new.owner_user_id is not null then
      insert into public.lead_owner_events (
        lead_id,
        from_user_id,
        to_user_id,
        actor_user_id,
        reason
      )
      values (new.id, null, new.owner_user_id, auth.uid(), 'created');
    end if;
    return new;
  end if;

  if new.owner_user_id is distinct from old.owner_user_id then
    insert into public.lead_owner_events (
      lead_id,
      from_user_id,
      to_user_id,
      actor_user_id,
      reason
    )
    values (new.id, old.owner_user_id, new.owner_user_id, auth.uid(), null);
  end if;

  return new;
end;
$$;

create trigger leads_guard_sensitive_update
  before update on public.leads
  for each row
  execute function public.leads_guard_sensitive_update();

create trigger leads_record_owner_event
  after insert or update of owner_user_id on public.leads
  for each row
  execute function public.leads_record_owner_event();

create trigger social_identities_guard_keys
  before update on public.social_identities
  for each row
  execute function public.leads_guard_social_identity();

create trigger lead_notes_guard_lead
  before update on public.lead_notes
  for each row
  execute function public.leads_guard_note();

create trigger lead_content_guard_identity
  before update on public.lead_content
  for each row
  execute function public.leads_guard_content();

create trigger user_roles_guard_last_admin
  before delete on public.user_roles
  for each row
  execute function public.leads_guard_last_admin();

create trigger role_permissions_guard_admin_roles
  before delete on public.role_permissions
  for each row
  execute function public.leads_guard_admin_permission();

create trigger roles_set_updated_at
  before update on public.roles
  for each row
  execute function public.leads_set_updated_at();

create trigger lead_sources_set_updated_at
  before update on public.lead_sources
  for each row
  execute function public.leads_set_updated_at();

create trigger lead_statuses_set_updated_at
  before update on public.lead_statuses
  for each row
  execute function public.leads_set_updated_at();

create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.leads_set_updated_at();

create trigger social_identities_set_updated_at
  before update on public.social_identities
  for each row
  execute function public.leads_set_updated_at();

create trigger lead_notes_set_updated_at
  before update on public.lead_notes
  for each row
  execute function public.leads_set_updated_at();

create trigger signup_reviews_set_updated_at
  before update on public.signup_reviews
  for each row
  execute function public.leads_set_updated_at();

create trigger import_jobs_set_updated_at
  before update on public.import_jobs
  for each row
  execute function public.leads_set_updated_at();

create trigger competitors_set_updated_at
  before update on public.competitors
  for each row
  execute function public.leads_set_updated_at();

create trigger system_settings_set_updated_at
  before update on public.system_settings
  for each row
  execute function public.leads_set_updated_at();

-- ---------------------------------------------------------------------------
-- Privileges and RLS. anon receives nothing.
-- ---------------------------------------------------------------------------

revoke all on function public.leads_set_updated_at() from public, anon;
revoke all on function public.leads_capabilities_ok(text[]) from public, anon;
revoke all on function public.leads_has_permission(text) from public, anon;
revoke all on function public.leads_can_read_lead(uuid) from public, anon;
revoke all on function public.leads_can_write_lead(uuid) from public, anon;
revoke all on function public.leads_guard_sensitive_update() from public, anon;
revoke all on function public.leads_guard_social_identity() from public, anon;
revoke all on function public.leads_guard_note() from public, anon;
revoke all on function public.leads_guard_content() from public, anon;
revoke all on function public.leads_guard_last_admin() from public, anon;
revoke all on function public.leads_guard_admin_permission() from public, anon;
revoke all on function public.leads_record_owner_event() from public, anon;

grant execute on function public.leads_set_updated_at() to authenticated;
grant execute on function public.leads_capabilities_ok(text[]) to authenticated;
grant execute on function public.leads_has_permission(text) to authenticated;
grant execute on function public.leads_can_read_lead(uuid) to authenticated;
grant execute on function public.leads_can_write_lead(uuid) to authenticated;
grant execute on function public.leads_guard_sensitive_update() to authenticated;
grant execute on function public.leads_guard_social_identity() to authenticated;
grant execute on function public.leads_guard_note() to authenticated;
grant execute on function public.leads_guard_content() to authenticated;
grant execute on function public.leads_guard_last_admin() to authenticated;
grant execute on function public.leads_guard_admin_permission() to authenticated;
grant execute on function public.leads_record_owner_event() to authenticated;

do $$
declare
  leads_table text;
begin
  foreach leads_table in array array[
    'roles',
    'permissions',
    'role_permissions',
    'user_roles',
    'lead_sources',
    'source_assignments',
    'lead_statuses',
    'leads',
    'social_identities',
    'lead_owner_events',
    'lead_notes',
    'lead_activities',
    'lead_metrics',
    'lead_content',
    'lead_ai_insights',
    'duplicate_candidates',
    'merge_history',
    'signup_reviews',
    'login_logs',
    'audit_logs',
    'import_jobs',
    'export_jobs',
    'competitors',
    'system_settings'
  ]
  loop
    execute format('alter table public.%I enable row level security', leads_table);
    execute format('revoke all on table public.%I from public, anon, authenticated', leads_table);
  end loop;
end;
$$;

grant select on public.roles to authenticated;
grant select, insert on public.permissions to authenticated;
grant select, insert, delete on public.role_permissions to authenticated;
grant select, insert, delete on public.user_roles to authenticated;
grant select, insert, update on public.lead_sources to authenticated;
grant select, insert, delete on public.source_assignments to authenticated;
grant select, update on public.lead_statuses to authenticated;
grant select, insert, update on public.leads to authenticated;
grant select, insert, update on public.social_identities to authenticated;
grant select on public.lead_owner_events to authenticated;
grant select, insert, update on public.lead_notes to authenticated;
grant select, insert on public.lead_activities to authenticated;
grant select, insert on public.lead_metrics to authenticated;
grant select, insert, update on public.lead_content to authenticated;
grant select, insert on public.lead_ai_insights to authenticated;
grant select, insert, update on public.duplicate_candidates to authenticated;
grant select on public.merge_history to authenticated;
grant select, update on public.signup_reviews to authenticated;
grant select on public.login_logs to authenticated;
grant select on public.audit_logs to authenticated;
grant select, insert, update on public.import_jobs to authenticated;
grant select, insert, update on public.export_jobs to authenticated;
grant select, insert, update on public.competitors to authenticated;
grant select, insert, update on public.system_settings to authenticated;

-- RBAC catalogs
create policy roles_select on public.roles
  for select to authenticated
  using (public.leads_has_permission('admin.roles') or public.leads_has_permission('admin.users'));

create policy permissions_select on public.permissions
  for select to authenticated
  using (public.leads_has_permission('admin.roles'));

create policy permissions_insert on public.permissions
  for insert to authenticated
  with check (public.leads_has_permission('admin.roles'));

create policy role_permissions_select on public.role_permissions
  for select to authenticated
  using (public.leads_has_permission('admin.roles'));

create policy role_permissions_insert on public.role_permissions
  for insert to authenticated
  with check (public.leads_has_permission('admin.roles'));

create policy role_permissions_delete on public.role_permissions
  for delete to authenticated
  using (public.leads_has_permission('admin.roles'));

create policy user_roles_select on public.user_roles
  for select to authenticated
  using (
    user_id = auth.uid()
    or public.leads_has_permission('admin.roles')
    or public.leads_has_permission('admin.users')
  );

create policy user_roles_insert on public.user_roles
  for insert to authenticated
  with check (public.leads_has_permission('admin.roles'));

create policy user_roles_delete on public.user_roles
  for delete to authenticated
  using (public.leads_has_permission('admin.roles'));

-- Sources
create policy lead_sources_select on public.lead_sources
  for select to authenticated
  using (
    public.leads_has_permission('sources.manage')
    or public.leads_has_permission('leads.assign')
    or exists (
      select 1
      from public.source_assignments as assignment
      where assignment.source_id = lead_sources.id
        and assignment.user_id = auth.uid()
    )
  );

create policy lead_sources_insert on public.lead_sources
  for insert to authenticated
  with check (public.leads_has_permission('sources.manage'));

create policy lead_sources_update on public.lead_sources
  for update to authenticated
  using (public.leads_has_permission('sources.manage'))
  with check (public.leads_has_permission('sources.manage'));

create policy source_assignments_select on public.source_assignments
  for select to authenticated
  using (
    user_id = auth.uid()
    or public.leads_has_permission('sources.assign')
    or public.leads_has_permission('sources.manage')
  );

create policy source_assignments_insert on public.source_assignments
  for insert to authenticated
  with check (public.leads_has_permission('sources.assign'));

create policy source_assignments_delete on public.source_assignments
  for delete to authenticated
  using (public.leads_has_permission('sources.assign'));

create policy lead_statuses_select on public.lead_statuses
  for select to authenticated
  using (public.leads_has_permission('leads.read') or public.leads_has_permission('admin.settings'));

create policy lead_statuses_update on public.lead_statuses
  for update to authenticated
  using (public.leads_has_permission('admin.settings'))
  with check (public.leads_has_permission('admin.settings'));

-- Leads
create policy leads_select on public.leads
  for select to authenticated
  using (public.leads_can_read_lead(id));

create policy leads_insert on public.leads
  for insert to authenticated
  with check (
    public.leads_has_permission('leads.write')
    and created_by = auth.uid()
    and merged_into_lead_id is null
    and (
      public.leads_has_permission('leads.assign')
      or (
        owner_user_id = auth.uid()
        and public.leads_has_permission('leads.claim')
      )
    )
  );

create policy leads_update on public.leads
  for update to authenticated
  using (
    public.leads_has_permission('leads.write')
    and (
      public.leads_can_write_lead(id)
      or (
        owner_user_id is null
        and public.leads_has_permission('leads.claim')
        and public.leads_can_read_lead(id)
      )
    )
  )
  with check (
    public.leads_has_permission('leads.write')
    and (
      public.leads_has_permission('leads.assign')
      or owner_user_id = auth.uid()
    )
  );

create policy social_identities_select on public.social_identities
  for select to authenticated
  using (public.leads_can_read_lead(lead_id));

create policy social_identities_insert on public.social_identities
  for insert to authenticated
  with check (
    public.leads_can_write_lead(lead_id)
    and (
      public.leads_has_permission('sources.manage')
      or exists (
        select 1
        from public.source_assignments as assignment
        where assignment.source_id = social_identities.source_id
          and assignment.user_id = auth.uid()
      )
    )
  );

create policy social_identities_update on public.social_identities
  for update to authenticated
  using (public.leads_can_write_lead(lead_id))
  with check (public.leads_can_write_lead(lead_id));

create policy lead_owner_events_select on public.lead_owner_events
  for select to authenticated
  using (public.leads_can_read_lead(lead_id));

create policy lead_notes_select on public.lead_notes
  for select to authenticated
  using (public.leads_can_read_lead(lead_id));

create policy lead_notes_insert on public.lead_notes
  for insert to authenticated
  with check (
    public.leads_can_write_lead(lead_id)
    and author_user_id = auth.uid()
  );

create policy lead_notes_update on public.lead_notes
  for update to authenticated
  using (
    author_user_id = auth.uid()
    and public.leads_can_write_lead(lead_id)
  )
  with check (
    author_user_id = auth.uid()
    and public.leads_can_write_lead(lead_id)
  );

create policy lead_activities_select on public.lead_activities
  for select to authenticated
  using (public.leads_can_read_lead(lead_id));

create policy lead_activities_insert on public.lead_activities
  for insert to authenticated
  with check (
    public.leads_can_write_lead(lead_id)
    and actor_user_id = auth.uid()
    and not pg_catalog.starts_with(activity_type, 'system.')
  );

create policy lead_metrics_select on public.lead_metrics
  for select to authenticated
  using (
    exists (
      select 1
      from public.social_identities as identity
      where identity.id = lead_metrics.social_identity_id
        and public.leads_can_read_lead(identity.lead_id)
    )
  );

create policy lead_metrics_insert on public.lead_metrics
  for insert to authenticated
  with check (
    exists (
      select 1
      from public.social_identities as identity
      where identity.id = lead_metrics.social_identity_id
        and public.leads_can_write_lead(identity.lead_id)
    )
  );

create policy lead_content_select on public.lead_content
  for select to authenticated
  using (
    exists (
      select 1
      from public.social_identities as identity
      where identity.id = lead_content.social_identity_id
        and public.leads_can_read_lead(identity.lead_id)
    )
  );

create policy lead_content_insert on public.lead_content
  for insert to authenticated
  with check (
    exists (
      select 1
      from public.social_identities as identity
      where identity.id = lead_content.social_identity_id
        and public.leads_can_write_lead(identity.lead_id)
    )
  );

create policy lead_content_update on public.lead_content
  for update to authenticated
  using (
    exists (
      select 1
      from public.social_identities as identity
      where identity.id = lead_content.social_identity_id
        and public.leads_can_write_lead(identity.lead_id)
    )
  )
  with check (
    exists (
      select 1
      from public.social_identities as identity
      where identity.id = lead_content.social_identity_id
        and public.leads_can_write_lead(identity.lead_id)
    )
  );

create policy lead_ai_insights_select on public.lead_ai_insights
  for select to authenticated
  using (public.leads_can_read_lead(lead_id));

create policy lead_ai_insights_insert on public.lead_ai_insights
  for insert to authenticated
  with check (
    public.leads_can_write_lead(lead_id)
    and created_by = auth.uid()
  );

create policy duplicate_candidates_select on public.duplicate_candidates
  for select to authenticated
  using (public.leads_has_permission('duplicates.review'));

create policy duplicate_candidates_insert on public.duplicate_candidates
  for insert to authenticated
  with check (
    public.leads_has_permission('duplicates.review')
    and (
      (status = 'pending' and reviewed_by is null)
      or (status <> 'pending' and reviewed_by = auth.uid())
    )
  );

create policy duplicate_candidates_update on public.duplicate_candidates
  for update to authenticated
  using (public.leads_has_permission('duplicates.review'))
  with check (
    public.leads_has_permission('duplicates.review')
    and (
      (status = 'pending' and reviewed_by is null)
      or (status <> 'pending' and reviewed_by = auth.uid())
    )
  );

create policy merge_history_select on public.merge_history
  for select to authenticated
  using (public.leads_has_permission('duplicates.review'));

-- No anon insert. Public signup stays disabled. A later server path creates requests.
create policy signup_reviews_select on public.signup_reviews
  for select to authenticated
  using (public.leads_has_permission('admin.users'));

create policy signup_reviews_update on public.signup_reviews
  for update to authenticated
  using (public.leads_has_permission('admin.users'))
  with check (public.leads_has_permission('admin.users'));

create policy login_logs_select on public.login_logs
  for select to authenticated
  using (public.leads_has_permission('admin.audit') or user_id = auth.uid());

create policy audit_logs_select on public.audit_logs
  for select to authenticated
  using (public.leads_has_permission('admin.audit'));

create policy import_jobs_select on public.import_jobs
  for select to authenticated
  using (
    public.leads_has_permission('admin.audit')
    or (created_by = auth.uid() and public.leads_has_permission('leads.import'))
  );

create policy import_jobs_insert on public.import_jobs
  for insert to authenticated
  with check (
    created_by = auth.uid()
    and public.leads_has_permission('leads.import')
  );

create policy import_jobs_update on public.import_jobs
  for update to authenticated
  using (created_by = auth.uid() and public.leads_has_permission('leads.import'))
  with check (created_by = auth.uid() and public.leads_has_permission('leads.import'));

create policy export_jobs_select on public.export_jobs
  for select to authenticated
  using (
    public.leads_has_permission('admin.audit')
    or (created_by = auth.uid() and public.leads_has_permission('leads.export'))
  );

create policy export_jobs_insert on public.export_jobs
  for insert to authenticated
  with check (
    created_by = auth.uid()
    and public.leads_has_permission('leads.export')
  );

create policy export_jobs_update on public.export_jobs
  for update to authenticated
  using (created_by = auth.uid() and public.leads_has_permission('leads.export'))
  with check (created_by = auth.uid() and public.leads_has_permission('leads.export'));

create policy competitors_select on public.competitors
  for select to authenticated
  using (public.leads_has_permission('admin.settings'));

create policy competitors_insert on public.competitors
  for insert to authenticated
  with check (public.leads_has_permission('admin.settings'));

create policy competitors_update on public.competitors
  for update to authenticated
  using (public.leads_has_permission('admin.settings'))
  with check (public.leads_has_permission('admin.settings'));

create policy system_settings_select on public.system_settings
  for select to authenticated
  using (public.leads_has_permission('admin.settings'));

create policy system_settings_insert on public.system_settings
  for insert to authenticated
  with check (public.leads_has_permission('admin.settings'));

create policy system_settings_update on public.system_settings
  for update to authenticated
  using (public.leads_has_permission('admin.settings'))
  with check (public.leads_has_permission('admin.settings'));

-- ---------------------------------------------------------------------------
-- Seed. No users, leads, identities, or provider secrets.
-- ---------------------------------------------------------------------------

insert into public.permissions (key, description)
values
  ('leads.read', 'View leads the caller is allowed to see'),
  ('leads.write', 'Create and update leads the caller is allowed to change'),
  ('leads.claim', 'Claim an unclaimed lead for yourself'),
  ('leads.assign', 'Assign, reassign, or release lead ownership'),
  ('leads.import', 'Create and read your own lead import jobs'),
  ('leads.export', 'Create and read your own lead export jobs'),
  ('sources.manage', 'Create and edit lead sources'),
  ('sources.assign', 'Assign lead sources to team members'),
  ('duplicates.review', 'Review duplicate candidates and record merges'),
  ('analytics.read', 'View analytics for leads you can access'),
  ('analytics.team', 'View team-wide lead analytics'),
  ('admin.users', 'Review signup requests and read role grants'),
  ('admin.roles', 'Manage roles and permission mappings'),
  ('admin.settings', 'Manage non-secret Leads settings, statuses, and competitors'),
  ('admin.audit', 'Read audit and login logs')
on conflict (key) do nothing;

insert into public.roles (key, name, description, is_system)
values
  (
    'admin',
    'Admin',
    'Manages SIGMA Leads roles, signup review, settings, and audit. Does not grant board access.',
    true
  ),
  (
    'lead_manager',
    'Lead manager',
    'Manages sources, assignments, duplicates, imports, exports, and lead ownership.',
    true
  ),
  (
    'bd',
    'Business development',
    'Works assigned sources and can claim unclaimed leads.',
    true
  ),
  (
    'viewer',
    'Viewer',
    'Reads leads and analytics the caller is allowed to see.',
    true
  )
on conflict (key) do nothing;

insert into public.role_permissions (role_id, permission_id)
select role.id, permission.id
from public.roles as role
join public.permissions as permission on true
where role.key = 'admin'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select role.id, permission.id
from public.roles as role
join public.permissions as permission
  on permission.key in (
    'leads.read',
    'leads.write',
    'leads.claim',
    'leads.assign',
    'leads.import',
    'leads.export',
    'sources.manage',
    'sources.assign',
    'duplicates.review',
    'analytics.read',
    'analytics.team'
  )
where role.key = 'lead_manager'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select role.id, permission.id
from public.roles as role
join public.permissions as permission
  on permission.key in ('leads.read', 'leads.write', 'leads.claim', 'analytics.read')
where role.key = 'bd'
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select role.id, permission.id
from public.roles as role
join public.permissions as permission
  on permission.key in ('leads.read', 'analytics.read')
where role.key = 'viewer'
on conflict do nothing;

insert into public.lead_statuses (key, label, sort_order, is_terminal, is_system)
values
  ('discovered', 'Discovered', 10, false, true),
  ('contacted', 'Contacted', 20, false, true),
  ('follow_up', 'Follow up', 30, false, true),
  ('negotiation', 'Negotiation', 40, false, true),
  ('signed', 'Signed', 50, true, true),
  ('rejected', 'Rejected', 60, true, true),
  ('archived', 'Archived', 70, true, true)
on conflict (key) do nothing;
