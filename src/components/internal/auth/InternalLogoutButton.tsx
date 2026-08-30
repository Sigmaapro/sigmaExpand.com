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
      className="h-11 min-h-11 w-auto px-4 text-[10px] tracking-[0.16em]"
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
