"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApplicationForm, ApplicationFormValues } from "../_components/ApplicationForm";
import { createApplication, ValidationError } from "@/lib/api-client";

export default function NewApplicationPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>();

  async function onSubmit(values: ApplicationFormValues) {
    setErrors(undefined);
    try {
      await createApplication(values);
      router.push("/applications");
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

  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">New application</h1>
          <p className="text-gray-600">Add a job you applied for.</p>
        </div>
        <Link className="rounded-md border px-3 py-2 text-sm" href="/applications">
          Back
        </Link>
      </header>

      <div className="rounded-lg border p-4">
        <ApplicationForm submitLabel="Create" onSubmit={onSubmit} serverErrors={errors} />
      </div>
    </main>
  );
}
