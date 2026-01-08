import Link from "next/link";
import { API_BASE_URL, Application } from "@/lib/api";

async function fetchApplication(id: string): Promise<Application | null> {
  const res = await fetch(`${API_BASE_URL}/applications/${id}`, { cache: "no-store" });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch application (${res.status})`);

  return res.json();
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-4 border-b py-3">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="col-span-2 text-sm">{value}</div>
    </div>
  );
}

export default async function ApplicationShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await fetchApplication(id);

  if (!application) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-sm text-gray-600">Not found.</p>
        <Link className="mt-4 inline-block underline" href="/applications">
          Back
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{application.company_name}</h1>
          <p className="text-gray-600">{application.role_title}</p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/applications/${application.id}/edit`}
            className="rounded-md border px-3 py-2 text-sm"
          >
            Edit
          </Link>
          <Link
            href="/applications"
            className="rounded-md bg-black px-3 py-2 text-sm text-white"
          >
            Back
          </Link>
        </div>
      </header>

      <div className="overflow-hidden rounded-lg border">
        <Row label="Status" value={application.status} />
        <Row label="Applied on" value={application.applied_on} />
        <Row label="Follow up on" value={application.follow_up_on ?? "-"} />
        <Row label="Last followed up" value={application.last_followed_up_on ?? "-"} />
        <Row label="Job URL" value={application.job_url ?? "-"} />
        <Row label="Contact email" value={application.contact_email ?? "-"} />
        <Row label="Salary" value={application.salary ?? "-"} />
        <Row label="Next action" value={application.next_action ?? "-"} />
        <Row label="Notes" value={application.notes ?? "-"} />
      </div>
    </main>
  );
}
