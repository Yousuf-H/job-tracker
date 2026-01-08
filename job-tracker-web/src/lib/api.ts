export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

export type Application = {
  id: number;
  company_name: string;
  role_title: string;
  status: string;
  applied_on: string;
  follow_up_on: string | null;
  last_followed_up_on: string | null;
  job_url: string | null;
  contact_email: string | null;
  salary: string | null;
  next_action: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function fetchApplications(): Promise<Application[]> {
  const res = await fetch(`${API_BASE_URL}/applications`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch applications (${res.status})`);
  }

  return res.json();
}
