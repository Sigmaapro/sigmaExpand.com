-- Assignment directory for SIGMA Leads.
-- user_roles is readable only for the current user, or for admin.users / admin.roles.
-- leads.assign does not include those admin permissions, so a lead manager cannot
-- discover eligible members through RLS. This function returns only user ids that
-- already hold Leads access. It does not grant assignment and does not change merge.

create or replace function public.leads_assignment_candidates()
returns table (user_id uuid)
language sql
stable
security definer
set search_path = pg_catalog, public, pg_temp
as $$
  select distinct granted.user_id
  from public.user_roles as granted
  join public.roles as role
    on role.id = granted.role_id
   and role.archived_at is null
  join public.role_permissions as role_permission
    on role_permission.role_id = role.id
  join public.permissions as permission
    on permission.id = role_permission.permission_id
  where public.leads_has_permission('leads.assign')
    and permission.key in ('leads.read', 'leads.write', 'leads.claim', 'leads.assign');
$$;

comment on function public.leads_assignment_candidates() is
  'User ids with Leads access, visible only to leads.assign. Does not use board admin.';

revoke all on function public.leads_assignment_candidates() from public, anon;
grant execute on function public.leads_assignment_candidates() to authenticated;
