#!/usr/bin/env sh
# Static validation for Phase 23.7 guard migration (no database required).
set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MIG="$ROOT/supabase/migrations/20261002000000_leads_integration_guards.sql"

test -f "$MIG"

if grep -q 'elsif not exists' "$MIG"; then
  echo 'FAIL: migration still contains legacy elsif not exists compare branches'
  exit 1
fi

for sym in \
  _sl_mig237_assert_existing_function \
  _sl_mig237_ensure_trigger \
  _sl_mig237_proconfig_ok \
  _sl_mig237_exec_acl_ok \
  _sl_mig237_owner_trusted
do
  if ! grep -q "$sym" "$MIG"; then
    echo "FAIL: missing symbol $sym"
    exit 1
  fi
done

if ! grep -q 'drop function if exists public._sl_mig237_proconfig_ok' "$MIG"; then
  echo 'FAIL: migration does not drop temporary helpers'
  exit 1
fi

assert_count="$(grep -c '_sl_mig237_assert_existing_function' "$MIG" || true)"
if [ "$assert_count" -lt 9 ]; then
  echo "FAIL: expected at least 9 assert calls, found $assert_count"
  exit 1
fi

ensure_count="$(grep -c 'perform public._sl_mig237_ensure_trigger' "$MIG" || true)"
if [ "$ensure_count" -ne 7 ]; then
  echo "FAIL: expected 7 ensure_trigger calls, found $ensure_count"
  exit 1
fi

echo 'PASS: phase23_7 static migration structure'