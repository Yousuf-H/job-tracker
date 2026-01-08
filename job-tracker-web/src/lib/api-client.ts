import type { Application } from "@/lib/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

export type ApplicationPayload = Partial<
  Pick<
    Application,
    | "company_name"
    | "role_title"
    | "status"
    | "applied_on"
    | "follow_up_on"
    | "last_followed_up_on"
    | "job_url"
    | "contact_email"
    | "salary"
    | "next_action"
    | "notes"
  >
>;

export type ValidationError = {
  error: "validation_failed";
  details: Record<string, string[]>;
};

function isValidationError(x: unknown): x is ValidationError {
  return (
    typeof x === "object" &&
    x !== null &&
    (x as any).error === "validation_failed" &&
    typeof (x as any).details === "object"
  );
}

export async function createApplication(payload: ApplicationPayload) {
  const res = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (res.ok) return data as Application;
  if (isValidationError(data)) throw data;

  throw new Error(`Create failed (${res.status})`);
}

export async function updateApplication(id: number, payload: ApplicationPayload) {
  const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (res.ok) return data as Application;
  if (isValidationError(data)) throw data;

  throw new Error(`Update failed (${res.status})`);
}

export async function deleteApplication(id: number) {
  const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: "DELETE",
  });

  if (res.status === 204) return;
  if (res.status === 404) throw new Error("not_found");

  throw new Error(`Delete failed (${res.status})`);
}
