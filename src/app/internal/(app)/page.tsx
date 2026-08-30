import { redirect } from "next/navigation";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

export default function InternalIndexPage() {
  redirect(INTERNAL_ROUTES.sigma);
}
