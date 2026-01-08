"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Application } from "@/lib/api";
import { API_BASE_URL, deleteApplication, updateApplication, ValidationError } from "@/lib/api-client";
import { ApplicationForm, ApplicationFormValues } from "../../_components/ApplicationForm";

async function fetchApplication(id: string): Promise<Application | null> {
  const res = await fetch(`${API_BASE_URL}/applications/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch application (${res.status})`);
  return res.json();
}

export default function EditApplicationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const a = await fetchApplication(id);
      if (!mounted) return;
      setApplication(a);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function onSubmit(values: ApplicationFormValues) {
    setErrors(undefined);
    try {
      await updateApplication(Number(id), values);
      router.push(`/applications/${id}`);
      router.refresh();
    } catch (e: any) {
      const ve = e as ValidationError;
      if (ve?.error === "validation_failed") {
        setErrors(ve.details);
        return;
      }
      throw e;
    }
  }

  async function onDelete() {
    if (!confirm("Delete this application?")) return;
    setDeleting(true);
    try {
      await deleteApplication(Number(id));
      router.push("/applications");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-sm text-gray-600">Loading…</p>
      </main>
    );
  }

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
          <h1 className="text-2xl font-semibold">Edit</h1>
          <p className="text-gray-600">{application.company_name}</p>
        </div>

        <div className="flex gap-2">
          <Link className="rounded-md border px-3 py-2 text-sm" href={`/applications/${id}`}>
            Back
          </Link>
          <button
            onClick={onDelete}
            disabled={deleting}
            className="rounded-md border px-3 py-2 text-sm text-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </header>

      <div className="rounded-lg border p-4">
        <ApplicationForm
          initialValues={{
            company_name: application.company_name,
            role_title: application.role_title,
            status: application.status as any,
            applied_on: application.applied_on,
            notes: application.notes ?? "",
          }}
          submitLabel="Save"
          onSubmit={onSubmit}
          serverErrors={errors}
        />
      </div>
    </main>
  );
}
