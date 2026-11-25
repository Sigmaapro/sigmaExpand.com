#!/usr/bin/env bash
# SIGMA Leads — PostgreSQL 17 guard migration replay (CI / local disposable).
# No Supabase URLs, no project credentials, no Sigma Test.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

: "${PGHOST:=localhost}"
: "${PGUSER:=postgres}"
: "${PGDATABASE:=postgres}"
: "${PGPORT:=5432}"
: "${POSTGRES_PASSWORD:=postgres}"
export PGPASSWORD="${POSTGRES_PASSWORD}"

psql_base=(psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -v ON_ERROR_STOP=1)

log() { printf '=== %s\n' "$*"; }

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "FATAL: required command missing: $1" >&2
    exit 2
  fi
}

require_cmd psql
require_cmd pg_isready

log 'Step 1 — PostgreSQL health check'
pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE"

log 'Step 2 — Minimal auth / role bootstrap'
"${psql_base[@]}" -f supabase/ci/postgres17_supabase_minimal_bootstrap.sql

MIGRATIONS=(
  supabase/migrations/20260930184800_sigma_leads_foundation.sql
  supabase/migrations/20261001030600_leads_merge_integrity.sql
  supabase/migrations/20261001190000_leads_assignment_candidates.sql
)

for path in "${MIGRATIONS[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "FATAL: missing migration: $path" >&2
    exit 2
  fi
  log "Apply $(basename "$path")"
  "${psql_base[@]}" -f "$path"
done

GUARD=supabase/migrations/20261002000000_leads_integration_guards.sql
if [[ ! -f "$GUARD" ]]; then
  echo "FATAL: missing guard migration" >&2
  exit 2
fi

log 'Step 5–6 — Guard migration (first apply)'
"${psql_base[@]}" -f "$GUARD"

log 'Step 7–8 — Guard migration (second apply / idempotency)'
"${psql_base[@]}" -f "$GUARD"

log 'Step 9 — Catalog tests'
"${psql_base[@]}" -f supabase/tests/phase23_5_guard_catalog_checks.sql

log 'Step 10 — Behavior tests (transaction rolls back data)'
if [[ "${SIGMA_CI_SET_JWT_CLAIM:-0}" == "1" ]]; then
  : "${SIGMA_CI_JWT_SUB:=00000000-0000-4000-8000-000000000001}"
  log "Behavior tests with request.jwt.claim.sub=${SIGMA_CI_JWT_SUB} (same psql session as SQL file)"
  # set_config must run in the same PostgreSQL session as the behavior script; separate psql -c calls drop context.
  "${psql_base[@]}" <<PSQL
select set_config('request.jwt.claim.sub', '${SIGMA_CI_JWT_SUB}', false);
\\i supabase/tests/phase23_5_guard_behavior_tests.sql
PSQL
else
  "${psql_base[@]}" -f supabase/tests/phase23_5_guard_behavior_tests.sql
fi

log 'Guard replay sequence finished successfully'