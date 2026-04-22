export type LeadPayload = {
  email: string;
  name?: string;
  message?: string;
  source: "book-call" | "live-support";
};

export type SubmitLeadResult =
  | { ok: true; partial?: boolean }
  | { ok: false; error: string; status: number };

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: { error?: string; ok?: boolean; partial?: boolean } = {};
  try {
    data = await res.json();
  } catch {
    /* ignore */
  }

  if (res.ok) {
    return { ok: true, partial: data.partial === true };
  }

  const err =
    typeof data.error === "string" && data.error.length > 0
      ? data.error
      : "Request failed";

  return { ok: false, error: err, status: res.status };
}
