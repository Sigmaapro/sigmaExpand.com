"use client";

import { useFormStatus } from "react-dom";
import { GlassButton } from "@/components/internal/glass/Glass";
import { logoutAction } from "@/lib/internal/auth-actions";

function LogoutSubmit() {
  const { pending } = useFormStatus();

  return (
    <GlassButton
      type="submit"
      variant="secondary"
      disabled={pending}
      className="internal-logout-control"
    >
      {pending ? "Signing out" : "Sign out"}
    </GlassButton>
  );
}

export function InternalLogoutButton() {
  return (
    <form action={logoutAction}>
      <LogoutSubmit />
    </form>
  );
}
