import Link from "next/link";
import {
  CalendarDays,
  Building2,
  Briefcase,
  CircleDollarSign,
  BadgeCheck,
  Link as LinkIcon,
  UserRound,
  ClipboardList,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
} from "lucide-react";

import { fetchApplications } from "@/lib/api";

function formatDate(dateStr: string) {
  // Rails gives "YYYY-MM-DD"
  const d = new Date(`${dateStr}T00:00:00`);
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function hostFromUrl(url: string | null) {
  if (!url) return "-";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function statusStyle(status: string) {
  switch (status) {
    case "applied":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "interview":
    case "interviewed":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "offer":
    case "offered":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "withdrawn":
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
    case "draft":
    default:
      return "bg-zinc-50 text-zinc-700 border-zinc-200";
  }
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

function ToolbarButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white text-zinc-700 hover:bg-zinc-50"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export default async function ApplicationsPage() {
  const applications = await fetchApplications();

  return (
    <main className="pb-14">
      {/* Hero */}
      <section className="relative h-66 border-b bg-zinc-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url('/hero.jpeg')",
          }}
        />
        {/* fallback gradient if hero.jpg is missing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.10),transparent_40%)]" />
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        {/* Title block */}
        <div className="relative z-10 flex items-start gap-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border bg-white shadow-sm">
            <ClipboardList className="h-6 w-6 text-zinc-900" />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Job Application Tracker
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
                  <ClipboardList className="h-4 w-4 text-zinc-700" />
                </span>
                Applications History
              </span>

              <div className="flex items-center gap-2">
                <ToolbarButton label="Filter">
                  <SlidersHorizontal className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton label="Sort">
                  <ArrowUpDown className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton label="Search">
                  <Search className="h-4 w-4" />
                </ToolbarButton>

                <Link
                  href="/applications/new"
                  className="ml-1 inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                >
                  New
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs text-zinc-600">
                <tr className="[&>th]:px-4 [&>th]:py-3">
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> Company
                    </span>
                  </th>
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Position
                    </span>
                  </th>
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4" /> Status
                    </span>
                  </th>
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> Application Date
                    </span>
                  </th>
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4" /> Salary
                    </span>
                  </th>
                  <th>Next Action</th>
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" /> Website
                    </span>
                  </th>
                  <th>
                    <span className="inline-flex items-center gap-2">
                      <UserRound className="h-4 w-4" /> Contact
                    </span>
                  </th>
                  <th>Reference Link</th>
                </tr>
              </thead>

              <tbody className="text-zinc-800">
                {applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-10 text-center text-zinc-500"
                    >
                      No applications yet. Click{" "}
                      <span className="font-medium">New</span> to add one.
                    </td>
                  </tr>
                ) : (
                  applications.map((a) => (
                    <tr key={a.id} className="border-t hover:bg-zinc-50/70">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                          href={`/applications/${a.id}`}
                        >
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-white">
                            <Building2 className="h-4 w-4 text-zinc-700" />
                          </span>
                          {a.company_name}
                        </Link>
                      </td>

                      <td className="px-4 py-3">{a.role_title}</td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${statusStyle(
                            a.status
                          )}`}
                        >
                          {a.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-zinc-700">
                        {formatDate(a.applied_on)}
                      </td>

                      <td className="px-4 py-3 text-zinc-700">
                        {a.salary ?? "-"}
                      </td>

                      <td className="px-4 py-3">
                        {a.next_action ? (
                          <Pill>{a.next_action}</Pill>
                        ) : (
                          <span className="text-zinc-400">-</span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-zinc-700">
                        {hostFromUrl(a.job_url)}
                      </td>

                      <td className="px-4 py-3 text-zinc-700">
                        {a.contact_email ?? "-"}
                      </td>

                      <td className="px-4 py-3">
                        {a.job_url ? (
                          <a
                            className="text-zinc-900 underline-offset-4 hover:underline"
                            href={a.job_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Link
                          </a>
                        ) : (
                          <span className="text-zinc-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between border-t bg-white px-4 py-3 text-xs text-zinc-500">
            <span>COUNT {applications.length}</span>
            <span>Updated just now</span>
          </div>
        </div>
      </div>
    </main>
  );
}
