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
      className="h-8 min-h-8 w-auto px-2.5 text-[9px] tracking-[0.12em] lg:h-11 lg:min-h-11 lg:px-4 lg:text-[10px] lg:tracking-[0.16em]"
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
