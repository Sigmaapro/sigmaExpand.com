-- Phase 23.5 / 23.7 — integration guard functions, helpers, and triggers.
-- Verified against Sigma Test catalog evidence (Phases 23.3, 23.4).
-- Create-if-absent; compare prosrc, proconfig, language, volatility, owner, and ACL when present.
-- On the create path only: apply captured ACL semantics. No blanket revoke on existing objects.
-- Temporary migration helpers (_sl_mig237_*) are dropped at the end of this file.

do $preflight$
begin
  if current_user in ('authenticated', 'anon', 'service_role', 'sigma_integration_worker') then
    raise exception 'integration guards must be installed by a trusted non-browser role, not %', current_user
      using errcode = '42501';
  end if;
  if to_regclass('public.leads') is null
     or to_regclass('public.lead_statuses') is null
     or to_regclass('public.user_roles') is null then
    raise exception 'CRM foundation migrations must run before integration guards';
  end if;
  if not exists (
    select 1
    from public.lead_statuses
    where key = 'discovered'
      and archived_at is null
      and is_terminal = false
  ) then
    raise exception 'active non-terminal discovered status is required';
  end if;

  if exists (
    select 1
    from pg_proc as p
    join pg_namespace as n on n.oid = p.pronamespace and n.nspname = 'public'
    where p.proname in (
      'leads_user_has_permission',
      'leads_can_own_lead',
      'leads_status_is_archived',
      'leads_guard_lifecycle',
      'leads_guard_owner_eligibility',
      'leads_record_created_activity',
      'leads_guard_direct_child_write',
      'leads_guard_activity_type',
      'leads_guard_duplicate_review'
    )
    and pg_catalog.lower(pg_get_userbyid(p.proowner)) in (
      'authenticated', 'anon', 'service_role', 'sigma_integration_worker'
    )
  ) then
    raise exception 'an integration guard or helper is owned by a browser or worker role';
  end if;
end
$preflight$;

-- ---------------------------------------------------------------------------
-- Temporary migration helpers (dropped at end of file)
-- ---------------------------------------------------------------------------

create or replace function public._sl_mig237_proconfig_ok(p_oid oid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from pg_proc as p
    cross join lateral unnest(coalesce(p.proconfig, array[]::text[])) as cfg(setting)
    where p.oid = p_oid
      and setting like 'search_path=%'
      and setting like '%pg_catalog%'
      and setting like '%public%'
      and setting like '%pg_temp%'
  );
$$;

create or replace function public._sl_mig237_owner_trusted(p_oid oid)
returns boolean
language sql
stable
as $$
  select pg_catalog.lower(pg_get_userbyid(p.proowner)) not in (
    'authenticated', 'anon', 'service_role', 'sigma_integration_worker'
  )
  from pg_proc as p
  where p.oid = p_oid;
$$;

create or replace function public._sl_mig237_exec_acl_ok(
  p_oid oid,
  p_anon boolean,
  p_authenticated boolean,
  p_service_role boolean
)
returns boolean
language sql
stable
as $$
  select
    pg_catalog.has_function_privilege('anon', p_oid, 'EXECUTE') is not distinct from p_anon
    and pg_catalog.has_function_privilege('authenticated', p_oid, 'EXECUTE')
      is not distinct from p_authenticated
    and pg_catalog.has_function_privilege('service_role', p_oid, 'EXECUTE')
      is not distinct from p_service_role;
$$;

create or replace function public._sl_mig237_assert_existing_function(
  p_signature text,
  p_expect_prosecdef boolean,
  p_expect_lang text,
  p_expect_volatile "char",
  p_expect_prosrc text,
  p_anon_exec boolean,
  p_authenticated_exec boolean,
  p_service_role_exec boolean
)
returns void
language plpgsql
as $$
declare
  v_oid oid;
begin
  v_oid := p_signature::regprocedure;
  if not exists (
    select 1
    from pg_proc as p
    join pg_language as l on l.oid = p.prolang
    where p.oid = v_oid
      and p.prosecdef is not distinct from p_expect_prosecdef
      and l.lanname = p_expect_lang
      and p.provolatile is not distinct from p_expect_volatile
      and trim(both from p.prosrc) = trim(both from p_expect_prosrc)
      and public._sl_mig237_proconfig_ok(p.oid)
      and public._sl_mig237_owner_trusted(p.oid)
  ) then
    raise exception '% exists but metadata/body does not match verified definition', p_signature;
  end if;
  if not public._sl_mig237_exec_acl_ok(
    v_oid, p_anon_exec, p_authenticated_exec, p_service_role_exec
  ) then
    raise exception '% exists but EXECUTE privileges do not match verified ACL', p_signature;
  end if;
end;
$$;

create or replace function public._sl_mig237_decode_tg_timing(p_tgtype integer)
returns text
language sql
immutable
as $$
  select case p_tgtype & 66
    when 2 then 'BEFORE'
    when 64 then 'INSTEAD OF'
    else 'AFTER'
  end;
$$;

create or replace function public._sl_mig237_decode_tg_events(p_tgtype integer)
returns text[]
language sql
immutable
as $$
  select array_remove(
    array[
      case when (p_tgtype & 4) <> 0 then 'INSERT' end,
      case when (p_tgtype & 8) <> 0 then 'DELETE' end,
      case when (p_tgtype & 16) <> 0 then 'UPDATE' end,
      case when (p_tgtype & 32) <> 0 then 'TRUNCATE' end
    ],
    null::text
  );
$$;

create or replace function public._sl_mig237_events_sql(p_events text[])
returns text
language plpgsql
as $$
declare
  v_parts text[] := '{}';
  v_event text;
begin
  foreach v_event in array p_events loop
    v_parts := v_parts || pg_catalog.lower(v_event);
  end loop;
  return array_to_string(v_parts, ' or ');
end;
$$;

create or replace function public._sl_mig237_ensure_trigger(
  p_tgname text,
  p_relname text,
  p_timing text,
  p_events text[],
  p_funcname text
)
returns void
language plpgsql
as $$
declare
  v_timing text;
  v_events text[];
  v_func text;
  v_want_events text[];
  v_sql text;
begin
  select
    public._sl_mig237_decode_tg_timing(t.tgtype::integer),
    public._sl_mig237_decode_tg_events(t.tgtype::integer),
    p.proname
  into v_timing, v_events, v_func
  from pg_trigger as t
  join pg_class as c on c.oid = t.tgrelid
  join pg_namespace as n on n.oid = c.relnamespace and n.nspname = 'public'
  join pg_proc as p on p.oid = t.tgfoid
  where not t.tgisinternal
    and t.tgname = p_tgname
    and c.relname = p_relname;

  v_want_events := coalesce(p_events, array[]::text[]);

  if not found then
    v_sql := format(
      'create trigger %I %s %s on public.%I for each row execute function %I()',
      p_tgname,
      pg_catalog.lower(p_timing),
      public._sl_mig237_events_sql(v_want_events),
      p_relname,
      p_funcname
    );
    execute v_sql;
    return;
  end if;

  v_events := coalesce(v_events, array[]::text[]);

  if v_timing is distinct from p_timing then
    raise exception 'trigger % on % has timing %, expected %',
      p_tgname, p_relname, v_timing, p_timing;
  end if;
  if v_func is distinct from p_funcname then
    raise exception 'trigger % on % calls %, expected %',
      p_tgname, p_relname, v_func, p_funcname;
  end if;
  if not (
    v_events @> v_want_events
    and v_want_events @> v_events
  ) then
    raise exception 'trigger % on % has events %, expected %',
      p_tgname, p_relname, v_events, v_want_events;
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- Helper: leads_user_has_permission(uuid, text)
-- ---------------------------------------------------------------------------

do $helper_user_has_permission$
begin
  if to_regprocedure('public.leads_user_has_permission(uuid, text)') is null then
    create function public.leads_user_has_permission(
      target_user_id uuid,
      permission_key text
    )
    returns boolean
    language sql
    stable
    security definer
    set search_path = pg_catalog, public, pg_temp
    as $fn$
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
        where user_role.user_id = target_user_id
          and permission.key = permission_key
      );
    $fn$;

    revoke all on function public.leads_user_has_permission(uuid, text) from public, anon, authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_user_has_permission(uuid, text)',
      true,
      'sql',
      's',
      $src$
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
        where user_role.user_id = target_user_id
          and permission.key = permission_key
      );
      $src$,
      false,
      false,
      false
    );
  end if;
end
$helper_user_has_permission$;

-- ---------------------------------------------------------------------------
-- Helper: leads_can_own_lead(uuid)
-- ---------------------------------------------------------------------------

do $helper_can_own_lead$
begin
  if to_regprocedure('public.leads_can_own_lead(uuid)') is null then
    create function public.leads_can_own_lead(target_user_id uuid)
    returns boolean
    language sql
    stable
    security definer
    set search_path = pg_catalog, public, pg_temp
    as $fn$
      select target_user_id is not null
        and public.leads_user_has_permission(target_user_id, 'leads.read')
        and public.leads_user_has_permission(target_user_id, 'leads.write');
    $fn$;

    revoke all on function public.leads_can_own_lead(uuid) from public, anon, authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_can_own_lead(uuid)',
      true,
      'sql',
      's',
      $src$
      select target_user_id is not null
        and public.leads_user_has_permission(target_user_id, 'leads.read')
        and public.leads_user_has_permission(target_user_id, 'leads.write');
      $src$,
      false,
      false,
      false
    );
  end if;
end
$helper_can_own_lead$;

-- ---------------------------------------------------------------------------
-- Helper: leads_status_is_archived(uuid)
-- ---------------------------------------------------------------------------

do $helper_status_is_archived$
begin
  if to_regprocedure('public.leads_status_is_archived(uuid)') is null then
    create function public.leads_status_is_archived(target_status_id uuid)
    returns boolean
    language sql
    stable
    security definer
    set search_path = pg_catalog, public, pg_temp
    as $fn$
      select exists (
        select 1
        from public.lead_statuses as status
        where status.id = target_status_id
          and status.key = 'archived'
      );
    $fn$;

    revoke all on function public.leads_status_is_archived(uuid) from public, anon;
    grant execute on function public.leads_status_is_archived(uuid) to authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_status_is_archived(uuid)',
      true,
      'sql',
      's',
      $src$
      select exists (
        select 1
        from public.lead_statuses as status
        where status.id = target_status_id
          and status.key = 'archived'
      );
      $src$,
      false,
      true,
      true
    );
  end if;
end
$helper_status_is_archived$;

-- ---------------------------------------------------------------------------
-- Guard: leads_guard_lifecycle()
-- ---------------------------------------------------------------------------

do $guard_lifecycle$
begin
  if to_regprocedure('public.leads_guard_lifecycle()') is null then
    create function public.leads_guard_lifecycle()
    returns trigger
    language plpgsql
    set search_path = pg_catalog, public, pg_temp
    as $fn$
declare
  direct_write boolean := current_user in ('authenticated', 'anon');
begin
  if tg_op = 'INSERT' then
    if direct_write then
      if new.archived_at is not null or public.leads_status_is_archived(new.status_id) then
        raise exception 'archive a lead with leads_archive' using errcode = '22023';
      end if;
      if new.merged_into_lead_id is not null then
        raise exception 'lead merge requires leads_merge_pair' using errcode = '42501';
      end if;
    end if;
  else
    -- Signed-in callers, directly or through a leads_* function, cannot change
    -- a merged or archived lead. Writes without a signed-in user are left to
    -- leads_guard_sensitive_update.
    if old.merged_into_lead_id is not null and (direct_write or auth.uid() is not null) then
      raise exception 'lead is merged' using errcode = 'P0001';
    end if;
    if old.archived_at is not null and (direct_write or auth.uid() is not null) then
      raise exception 'lead is archived' using errcode = 'P0001';
    end if;

    if direct_write then
      if new.merged_into_lead_id is distinct from old.merged_into_lead_id then
        raise exception 'lead merge requires leads_merge_pair' using errcode = '42501';
      end if;
      if new.archived_at is distinct from old.archived_at then
        raise exception 'archive a lead with leads_archive' using errcode = '22023';
      end if;
      if new.owner_user_id is distinct from old.owner_user_id then
        raise exception 'lead ownership changes require leads_claim, leads_release, or leads_assign'
          using errcode = '42501';
      end if;
      if new.status_id is distinct from old.status_id then
        raise exception 'lead status changes require leads_set_status' using errcode = '42501';
      end if;
    end if;

    if new.status_id is not distinct from old.status_id
      and new.archived_at is not distinct from old.archived_at then
      return new;
    end if;
  end if;

  if public.leads_status_is_archived(new.status_id) is distinct from (new.archived_at is not null) then
    raise exception 'archived status and archived_at must change together' using errcode = '23514';
  end if;

  return new;
end;
$fn$;

    revoke all on function public.leads_guard_lifecycle() from public, anon, authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_guard_lifecycle()',
      false,
      'plpgsql',
      'v',
      $src$
declare
  direct_write boolean := current_user in ('authenticated', 'anon');
begin
  if tg_op = 'INSERT' then
    if direct_write then
      if new.archived_at is not null or public.leads_status_is_archived(new.status_id) then
        raise exception 'archive a lead with leads_archive' using errcode = '22023';
      end if;
      if new.merged_into_lead_id is not null then
        raise exception 'lead merge requires leads_merge_pair' using errcode = '42501';
      end if;
    end if;
  else
    -- Signed-in callers, directly or through a leads_* function, cannot change
    -- a merged or archived lead. Writes without a signed-in user are left to
    -- leads_guard_sensitive_update.
    if old.merged_into_lead_id is not null and (direct_write or auth.uid() is not null) then
      raise exception 'lead is merged' using errcode = 'P0001';
    end if;
    if old.archived_at is not null and (direct_write or auth.uid() is not null) then
      raise exception 'lead is archived' using errcode = 'P0001';
    end if;

    if direct_write then
      if new.merged_into_lead_id is distinct from old.merged_into_lead_id then
        raise exception 'lead merge requires leads_merge_pair' using errcode = '42501';
      end if;
      if new.archived_at is distinct from old.archived_at then
        raise exception 'archive a lead with leads_archive' using errcode = '22023';
      end if;
      if new.owner_user_id is distinct from old.owner_user_id then
        raise exception 'lead ownership changes require leads_claim, leads_release, or leads_assign'
          using errcode = '42501';
      end if;
      if new.status_id is distinct from old.status_id then
        raise exception 'lead status changes require leads_set_status' using errcode = '42501';
      end if;
    end if;

    if new.status_id is not distinct from old.status_id
      and new.archived_at is not distinct from old.archived_at then
      return new;
    end if;
  end if;

  if public.leads_status_is_archived(new.status_id) is distinct from (new.archived_at is not null) then
    raise exception 'archived status and archived_at must change together' using errcode = '23514';
  end if;

  return new;
end;
      $src$,
      false,
      false,
      false
    );
  end if;
end
$guard_lifecycle$;

-- ---------------------------------------------------------------------------
-- Guard: leads_guard_owner_eligibility()
-- ---------------------------------------------------------------------------

do $guard_owner_eligibility$
begin
  if to_regprocedure('public.leads_guard_owner_eligibility()') is null then
    create function public.leads_guard_owner_eligibility()
    returns trigger
    language plpgsql
    security definer
    set search_path = pg_catalog, public, pg_temp
    as $fn$
begin
  if new.owner_user_id is null then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.owner_user_id is not distinct from old.owner_user_id then
    return new;
  end if;
  if not public.leads_can_own_lead(new.owner_user_id) then
    raise exception 'lead owner must have leads.read and leads.write' using errcode = '22023';
  end if;
  return new;
end;
$fn$;

    revoke all on function public.leads_guard_owner_eligibility() from public, anon, authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_guard_owner_eligibility()',
      true,
      'plpgsql',
      'v',
      $src$
begin
  if new.owner_user_id is null then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.owner_user_id is not distinct from old.owner_user_id then
    return new;
  end if;
  if not public.leads_can_own_lead(new.owner_user_id) then
    raise exception 'lead owner must have leads.read and leads.write' using errcode = '22023';
  end if;
  return new;
end;
      $src$,
      false,
      false,
      false
    );
  end if;
end
$guard_owner_eligibility$;

-- ---------------------------------------------------------------------------
-- Guard: leads_record_created_activity()
-- ---------------------------------------------------------------------------

do $guard_record_created_activity$
begin
  if to_regprocedure('public.leads_record_created_activity()') is null then
    create function public.leads_record_created_activity()
    returns trigger
    language plpgsql
    security definer
    set search_path = pg_catalog, public, pg_temp
    as $fn$
declare
  actor uuid := auth.uid();
begin
  if actor is not null then
    insert into public.lead_activities (lead_id, actor_user_id, activity_type, metadata)
    values (new.id, actor, 'lead_created', '{}'::jsonb);
  end if;
  return new;
end;
$fn$;

    revoke all on function public.leads_record_created_activity() from public, anon, authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_record_created_activity()',
      true,
      'plpgsql',
      'v',
      $src$
declare
  actor uuid := auth.uid();
begin
  if actor is not null then
    insert into public.lead_activities (lead_id, actor_user_id, activity_type, metadata)
    values (new.id, actor, 'lead_created', '{}'::jsonb);
  end if;
  return new;
end;
      $src$,
      false,
      false,
      false
    );
  end if;
end
$guard_record_created_activity$;

-- ---------------------------------------------------------------------------
-- Guard: leads_guard_direct_child_write()
-- ---------------------------------------------------------------------------

do $guard_direct_child_write$
begin
  if to_regprocedure('public.leads_guard_direct_child_write()') is null then
    create function public.leads_guard_direct_child_write()
    returns trigger
    language plpgsql
    set search_path = pg_catalog, public, pg_temp
    as $fn$
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;
  if tg_table_name = 'lead_notes' then
    raise exception 'notes are changed with leads_add_note or leads_update_note'
      using errcode = '42501';
  end if;
  raise exception 'identities are changed with leads_attach_identity or leads_set_identity_active'
    using errcode = '42501';
end;
$fn$;

    revoke all on function public.leads_guard_direct_child_write() from public, anon, authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_guard_direct_child_write()',
      false,
      'plpgsql',
      'v',
      $src$
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;
  if tg_table_name = 'lead_notes' then
    raise exception 'notes are changed with leads_add_note or leads_update_note'
      using errcode = '42501';
  end if;
  raise exception 'identities are changed with leads_attach_identity or leads_set_identity_active'
    using errcode = '42501';
end;
      $src$,
      false,
      false,
      false
    );
  end if;
end
$guard_direct_child_write$;

-- ---------------------------------------------------------------------------
-- Guard: leads_guard_activity_type()
-- ---------------------------------------------------------------------------

do $guard_activity_type$
begin
  if to_regprocedure('public.leads_guard_activity_type()') is null then
    create function public.leads_guard_activity_type()
    returns trigger
    language plpgsql
    set search_path = pg_catalog, public, pg_temp
    as $fn$
begin
  if current_user in ('authenticated', 'anon') then
    raise exception 'lead activity is recorded by the database' using errcode = '42501';
  end if;
  return new;
end;
$fn$;

    revoke all on function public.leads_guard_activity_type() from public, anon, authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_guard_activity_type()',
      false,
      'plpgsql',
      'v',
      $src$
begin
  if current_user in ('authenticated', 'anon') then
    raise exception 'lead activity is recorded by the database' using errcode = '42501';
  end if;
  return new;
end;
      $src$,
      false,
      false,
      false
    );
  end if;
end
$guard_activity_type$;

-- ---------------------------------------------------------------------------
-- Guard: leads_guard_duplicate_review()
-- ---------------------------------------------------------------------------

do $guard_duplicate_review$
begin
  if to_regprocedure('public.leads_guard_duplicate_review()') is null then
    create function public.leads_guard_duplicate_review()
    returns trigger
    language plpgsql
    set search_path = pg_catalog, public, pg_temp
    as $fn$
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.status = 'merged' then
      raise exception 'duplicate merges require leads_merge_pair' using errcode = '42501';
    end if;
    return new;
  end if;

  if old.status is distinct from 'pending' then
    raise exception 'This duplicate review is no longer pending.' using errcode = 'P0002';
  end if;
  if new.status = 'merged' then
    raise exception 'duplicate merges require leads_merge_pair' using errcode = '42501';
  end if;
  if new.lead_low_id is distinct from old.lead_low_id
    or new.lead_high_id is distinct from old.lead_high_id then
    raise exception 'duplicate review leads are immutable' using errcode = '42501';
  end if;

  return new;
end;
$fn$;

    revoke all on function public.leads_guard_duplicate_review() from public, anon, authenticated, service_role;
  else
    perform public._sl_mig237_assert_existing_function(
      'public.leads_guard_duplicate_review()',
      false,
      'plpgsql',
      'v',
      $src$
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.status = 'merged' then
      raise exception 'duplicate merges require leads_merge_pair' using errcode = '42501';
    end if;
    return new;
  end if;

  if old.status is distinct from 'pending' then
    raise exception 'This duplicate review is no longer pending.' using errcode = 'P0002';
  end if;
  if new.status = 'merged' then
    raise exception 'duplicate merges require leads_merge_pair' using errcode = '42501';
  end if;
  if new.lead_low_id is distinct from old.lead_low_id
    or new.lead_high_id is distinct from old.lead_high_id then
    raise exception 'duplicate review leads are immutable' using errcode = '42501';
  end if;

  return new;
end;
      $src$,
      false,
      false,
      false
    );
  end if;
end
$guard_duplicate_review$;

-- ---------------------------------------------------------------------------
-- Triggers (seven) — structural create/compare (Phase 23.7 / TR-1)
-- ---------------------------------------------------------------------------

do $triggers$
begin
  perform public._sl_mig237_ensure_trigger(
    'leads_guard_lifecycle',
    'leads',
    'BEFORE',
    array['INSERT', 'UPDATE'],
    'leads_guard_lifecycle'
  );
  perform public._sl_mig237_ensure_trigger(
    'leads_guard_owner_eligibility',
    'leads',
    'BEFORE',
    array['INSERT', 'UPDATE'],
    'leads_guard_owner_eligibility'
  );
  perform public._sl_mig237_ensure_trigger(
    'leads_record_created_activity',
    'leads',
    'AFTER',
    array['INSERT'],
    'leads_record_created_activity'
  );
  perform public._sl_mig237_ensure_trigger(
    'social_identities_guard_direct_write',
    'social_identities',
    'BEFORE',
    array['INSERT', 'UPDATE'],
    'leads_guard_direct_child_write'
  );
  perform public._sl_mig237_ensure_trigger(
    'lead_notes_guard_direct_write',
    'lead_notes',
    'BEFORE',
    array['INSERT', 'UPDATE'],
    'leads_guard_direct_child_write'
  );
  perform public._sl_mig237_ensure_trigger(
    'lead_activities_guard_type',
    'lead_activities',
    'BEFORE',
    array['INSERT'],
    'leads_guard_activity_type'
  );
  perform public._sl_mig237_ensure_trigger(
    'duplicate_candidates_guard_review',
    'duplicate_candidates',
    'BEFORE',
    array['INSERT', 'UPDATE'],
    'leads_guard_duplicate_review'
  );
end
$triggers$;

-- ---------------------------------------------------------------------------
-- Drop temporary migration helpers
-- ---------------------------------------------------------------------------

drop function if exists public._sl_mig237_ensure_trigger(text, text, text, text[], text);
drop function if exists public._sl_mig237_events_sql(text[]);
drop function if exists public._sl_mig237_decode_tg_events(integer);
drop function if exists public._sl_mig237_decode_tg_timing(integer);
drop function if exists public._sl_mig237_assert_existing_function(
  text, boolean, text, "char", text, boolean, boolean, boolean
);
drop function if exists public._sl_mig237_exec_acl_ok(oid, boolean, boolean, boolean);
drop function if exists public._sl_mig237_owner_trusted(oid);
drop function if exists public._sl_mig237_proconfig_ok(oid);