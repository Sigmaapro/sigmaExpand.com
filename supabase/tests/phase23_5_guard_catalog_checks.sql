-- Phase 23.5 / 23.7 post-apply catalog checks for guard migration.
-- Run only on a disposable database after 20261002000000_leads_integration_guards.sql.
-- Read-only catalog assertions. Raises on mismatch. Does not mutate data.

create or replace function public._phase237_exec_matrix(
  p_signature text,
  p_anon boolean,
  p_authenticated boolean,
  p_service_role boolean
)
returns boolean
language sql
stable
as $$
  with fn as (select p_signature::regprocedure::oid as oid)
  select
    pg_catalog.has_function_privilege('anon', fn.oid, 'EXECUTE') is not distinct from p_anon
    and pg_catalog.has_function_privilege('authenticated', fn.oid, 'EXECUTE')
      is not distinct from p_authenticated
    and pg_catalog.has_function_privilege('service_role', fn.oid, 'EXECUTE')
      is not distinct from p_service_role
  from fn;
$$;

create or replace function public._phase237_assert_trigger_row(
  p_tgname text,
  p_relname text,
  p_timing text,
  p_events text[],
  p_func text
)
returns void
language plpgsql
as $$
declare
  v_timing text;
  v_events text[];
  v_func text;
begin
  select
    case t.tgtype::integer & 66 when 2 then 'BEFORE' when 64 then 'INSTEAD OF' else 'AFTER' end,
    array_remove(
      array[
        case when (t.tgtype::integer & 4) <> 0 then 'INSERT' end,
        case when (t.tgtype::integer & 8) <> 0 then 'DELETE' end,
        case when (t.tgtype::integer & 16) <> 0 then 'UPDATE' end,
        case when (t.tgtype::integer & 32) <> 0 then 'TRUNCATE' end
      ],
      null::text
    ),
    p.proname
  into v_timing, v_events, v_func
  from pg_trigger as t
  join pg_class as c on c.oid = t.tgrelid
  join pg_namespace as n on n.oid = c.relnamespace and n.nspname = 'public'
  join pg_proc as p on p.oid = t.tgfoid
  where not t.tgisinternal
    and t.tgname = p_tgname
    and c.relname = p_relname;

  if not found then
    raise exception 'missing trigger % on %', p_tgname, p_relname;
  end if;
  if v_timing is distinct from p_timing or v_func is distinct from p_func then
    raise exception 'trigger % on % has timing % and function %, expected % / %',
      p_tgname, p_relname, v_timing, v_func, p_timing, p_func;
  end if;
  if not (v_events @> p_events and p_events @> v_events) then
    raise exception 'trigger % on % has events %, expected %', p_tgname, p_relname, v_events, p_events;
  end if;
end;
$$;

do $catalog$
declare
  v_sig text;
  v_oid oid;
  v_timing text;
  v_events text[];
  v_func text;
begin
  foreach v_sig in array array[
    'leads_user_has_permission(uuid, text)',
    'leads_can_own_lead(uuid)',
    'leads_status_is_archived(uuid)',
    'leads_guard_lifecycle()',
    'leads_guard_owner_eligibility()',
    'leads_record_created_activity()',
    'leads_guard_direct_child_write()',
    'leads_guard_activity_type()',
    'leads_guard_duplicate_review()'
  ]
  loop
    if to_regprocedure('public.' || v_sig) is null then
      raise exception 'missing function %', v_sig;
    end if;
  end loop;

  foreach v_sig in array array[
    'leads_user_has_permission(uuid, text)',
    'leads_can_own_lead(uuid)',
    'leads_status_is_archived(uuid)',
    'leads_guard_lifecycle()',
    'leads_guard_owner_eligibility()',
    'leads_record_created_activity()',
    'leads_guard_direct_child_write()',
    'leads_guard_activity_type()',
    'leads_guard_duplicate_review()'
  ]
  loop
    v_oid := ('public.' || v_sig)::regprocedure;
  if pg_catalog.lower(pg_get_userbyid((select proowner from pg_proc where oid = v_oid))) in (
    'authenticated', 'anon', 'service_role', 'sigma_integration_worker'
  ) then
    raise exception '% is owned by a browser or worker role', v_sig;
  end if;
    if not exists (
      select 1
      from pg_proc as p
      cross join lateral unnest(coalesce(p.proconfig, array[]::text[])) as cfg(setting)
      where p.oid = v_oid
        and setting like 'search_path=%'
        and setting like '%pg_catalog%'
        and setting like '%public%'
        and setting like '%pg_temp%'
    ) then
      raise exception '% is missing verified search_path proconfig', v_sig;
    end if;
  end loop;

  if not public._phase237_exec_matrix(
    'public.leads_user_has_permission(uuid, text)',
    false, false, false
  ) then
    raise exception 'leads_user_has_permission EXECUTE matrix mismatch';
  end if;
  if not public._phase237_exec_matrix(
    'public.leads_can_own_lead(uuid)',
    false, false, false
  ) then
    raise exception 'leads_can_own_lead EXECUTE matrix mismatch';
  end if;
  if not public._phase237_exec_matrix(
    'public.leads_status_is_archived(uuid)',
    false, true, true
  ) then
    raise exception 'leads_status_is_archived EXECUTE matrix mismatch';
  end if;

  foreach v_sig in array array[
    'leads_guard_lifecycle()',
    'leads_guard_owner_eligibility()',
    'leads_record_created_activity()',
    'leads_guard_direct_child_write()',
    'leads_guard_activity_type()',
    'leads_guard_duplicate_review()'
  ]
  loop
    if not public._phase237_exec_matrix('public.' || v_sig, false, false, false) then
      raise exception '% guard EXECUTE matrix mismatch', v_sig;
    end if;
  end loop;

  if not exists (
    select 1
    from pg_proc as p
    where p.oid = 'public.leads_guard_owner_eligibility()'::regprocedure
      and p.prosecdef
  ) then
    raise exception 'leads_guard_owner_eligibility must be SECURITY DEFINER';
  end if;

  if not exists (
    select 1
    from pg_proc as p
    where p.oid = 'public.leads_record_created_activity()'::regprocedure
      and p.prosecdef
  ) then
    raise exception 'leads_record_created_activity must be SECURITY DEFINER';
  end if;

  if not exists (
    select 1
    from pg_proc as p
    where p.oid = 'public.leads_guard_lifecycle()'::regprocedure
      and not p.prosecdef
  ) then
    raise exception 'leads_guard_lifecycle must be SECURITY INVOKER';
  end if;

  if exists (
    select 1
    from pg_catalog.pg_proc as p
    join pg_namespace as n on n.oid = p.pronamespace and n.nspname = 'public'
    where p.proname in (
      'leads_guard_lifecycle',
      'leads_guard_owner_eligibility',
      'leads_record_created_activity',
      'leads_guard_direct_child_write',
      'leads_guard_activity_type',
      'leads_guard_duplicate_review'
    )
    and pg_get_function_identity_arguments(p.oid) <> ''
  ) then
    raise exception 'a guard function has unexpected overload arguments';
  end if;

  perform public._phase237_assert_trigger_row(
    'leads_guard_lifecycle', 'leads', 'BEFORE', array['INSERT', 'UPDATE'], 'leads_guard_lifecycle'
  );
  perform public._phase237_assert_trigger_row(
    'leads_guard_owner_eligibility', 'leads', 'BEFORE', array['INSERT', 'UPDATE'], 'leads_guard_owner_eligibility'
  );
  perform public._phase237_assert_trigger_row(
    'leads_record_created_activity', 'leads', 'AFTER', array['INSERT'], 'leads_record_created_activity'
  );
  perform public._phase237_assert_trigger_row(
    'social_identities_guard_direct_write', 'social_identities', 'BEFORE',
    array['INSERT', 'UPDATE'], 'leads_guard_direct_child_write'
  );
  perform public._phase237_assert_trigger_row(
    'lead_notes_guard_direct_write', 'lead_notes', 'BEFORE', array['INSERT', 'UPDATE'], 'leads_guard_direct_child_write'
  );
  perform public._phase237_assert_trigger_row(
    'lead_activities_guard_type', 'lead_activities', 'BEFORE', array['INSERT'], 'leads_guard_activity_type'
  );
  perform public._phase237_assert_trigger_row(
    'duplicate_candidates_guard_review', 'duplicate_candidates', 'BEFORE',
    array['INSERT', 'UPDATE'], 'leads_guard_duplicate_review'
  );
end
$catalog$;

select proname,
       pg_get_userbyid(proowner) as owner_name,
       prosecdef as security_definer,
       proconfig as function_settings
from pg_proc as p
join pg_namespace as n on n.oid = p.pronamespace and n.nspname = 'public'
where proname in (
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
order by proname;

drop function if exists public._phase237_assert_trigger_row(text, text, text, text[], text);
drop function if exists public._phase237_exec_matrix(text, boolean, boolean, boolean);