import type { Metadata } from "next";
import { ComingSoonMessages } from "@/components/internal/messages/ComingSoonMessages";

export const metadata: Metadata = {
  title: { absolute: "Messages · SIGMA" },
  robots: { index: false, follow: false },
};

export default function InternalMessagesPage() {
  return <ComingSoonMessages />;
}
