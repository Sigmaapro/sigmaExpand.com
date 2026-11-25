#!/usr/bin/env bash
# Static validation for Phase 23.9 CI assets (no PostgreSQL required).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

fail() { echo "FAIL: $*" >&2; exit 1; }
ok() { echo "OK: $*"; }

WORKFLOW=.github/workflows/sigma-leads-guard-replay-postgres17.yml
BOOTSTRAP=supabase/ci/postgres17_supabase_minimal_bootstrap.sql
REPLAY=scripts/ci/guard-replay-postgres17.sh

test -f "$WORKFLOW" || fail "missing workflow"
test -f "$BOOTSTRAP" || fail "missing bootstrap"
test -f "$REPLAY" || fail "missing replay script"

# Paths referenced by replay script
for path in \
  supabase/migrations/20260930184800_sigma_leads_foundation.sql \
  supabase/migrations/20261001030600_leads_merge_integrity.sql \
  supabase/migrations/20261001190000_leads_assignment_candidates.sql \
  supabase/migrations/20261002000000_leads_integration_guards.sql \
  supabase/tests/phase23_5_guard_catalog_checks.sql \
  supabase/tests/phase23_5_guard_behavior_tests.sql
do
  test -f "$path" || fail "replay references missing file: $path"
done
ok "all migration and test paths exist"

# No remote Supabase endpoints or secret env names in CI assets (defensive grep strings excluded)
for f in "$WORKFLOW" "$BOOTSTRAP" "$REPLAY"; do
  if grep -v 'grep -qiE' "$f" | grep -qE 'supabase\.co|SIGMA_TEST_SUPABASE|SUPABASE_URL|SUPABASE_.*KEY'; then
    fail "possible credential/remote reference in $f"
  fi
done
ok "no supabase.co endpoints or secret env names in CI assets"

# Workflow trigger model
grep -q 'workflow_dispatch:' "$WORKFLOW" || fail "workflow must use workflow_dispatch"
if grep -q '^on:$' "$WORKFLOW"; then
  if grep -A5 '^on:' "$WORKFLOW" | grep -qE '^\s+push:|^\s+pull_request:'; then
    fail "workflow must not auto-trigger on push/pull_request in Phase 23.9"
  fi
fi
ok "workflow_dispatch-only trigger"

grep -q 'permissions:' "$WORKFLOW" || fail "permissions block missing"
grep -q 'contents: read' "$WORKFLOW" || fail "expected contents: read permission"
grep -q 'postgres:17' "$WORKFLOW" || fail "expected postgres:17 service image"
ok "workflow security baseline"

# YAML parse when PyYAML available
if python3 -c 'import yaml' 2>/dev/null; then
  python3 -c "import yaml; yaml.safe_load(open('$WORKFLOW'))"
  ok "workflow YAML parses"
else
  echo "SKIP: PyYAML not installed; YAML syntax not machine-validated"
fi

sh -n "$REPLAY" || fail "replay script shell syntax"
ok "replay script shell syntax"

sh scripts/phase23_7_static_validate.sh
ok "phase23_7 static migration validator"

echo 'PASS: Phase 23.9 CI infrastructure static validation'