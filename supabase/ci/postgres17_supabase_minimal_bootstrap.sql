-- Minimal Supabase-shaped bootstrap for isolated PostgreSQL 17 CI replay.
-- Scope: satisfy foreign keys and GRANT targets required by SIGMA CRM foundation migrations.
-- Not a Supabase platform install. Not used against Sigma Test or Production.
--
-- Preconditions: connected as superuser (postgres) to disposable database.
-- Fail-fast: ON_ERROR_STOP must be enabled by the caller (psql -v ON_ERROR_STOP=1).

\set ON_ERROR_STOP on

do $guard$
begin
  if current_user <> 'postgres' then
    raise exception 'bootstrap must run as postgres superuser, not %', current_user;
  end if;
end;
$guard$;

create schema if not exists auth;
comment on schema auth is
  'CI minimal auth schema: auth.users FK target only. Not Supabase Auth.';

create table if not exists auth.users (
  id uuid primary key,
  email text,
  created_at timestamptz not null default pg_catalog.now()
);

comment on table auth.users is
  'Stub users table for FK references. No auth provider, no RLS.';

do $roles$
begin
  if not exists (select 1 from pg_catalog.pg_roles where rolname = 'anon') then
    create role anon nologin nocreaterole nocreatedb nosuperuser;
  end if;
  if not exists (select 1 from pg_catalog.pg_roles where rolname = 'authenticated') then
    create role authenticated nologin nocreaterole nocreatedb nosuperuser;
  end if;
  if not exists (select 1 from pg_catalog.pg_roles where rolname = 'service_role') then
    create role service_role nologin nocreaterole nocreatedb nosuperuser bypassrls;
  end if;
end;
$roles$;

grant usage on schema public to anon, authenticated, service_role;
grant usage on schema auth to authenticated, service_role;

-- Supabase-compatible session helper (JWT claim stub). Real Supabase also sets role via GUC.
create or replace function auth.uid()
returns uuid
language sql
stable
security definer
set search_path = pg_catalog, auth, public
as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

comment on function auth.uid() is
  'CI stub: null unless request.jwt.claim.sub is set via set_config in the session.';

-- Privilege checks in catalog tests call has_function_privilege(role, oid, EXECUTE).
-- Roles must exist; grants are applied by migrations after bootstrap.

select 'sigma-leads postgres17 bootstrap complete' as status;