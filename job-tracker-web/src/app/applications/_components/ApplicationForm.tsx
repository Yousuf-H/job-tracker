"use client";

import { useMemo, useState } from "react";

type FormErrors = Record<string, string[]>;

const STATUSES = ["draft", "applied", "interview", "offer", "rejected", "withdrawn"] as const;

export type ApplicationFormValues = {
  company_name: string;
  role_title: string;
  status: (typeof STATUSES)[number];
  applied_on: string;
  notes: string;
};

export function ApplicationForm({
  initialValues,
  onSubmit,
  submitLabel,
  serverErrors,
}: {
  initialValues?: Partial<ApplicationFormValues>;
  onSubmit: (values: ApplicationFormValues) => Promise<void>;
  submitLabel: string;
  serverErrors?: FormErrors;
}) {
  const defaults = useMemo(
    () => ({
      company_name: initialValues?.company_name ?? "",
      role_title: initialValues?.role_title ?? "",
      status: initialValues?.status ?? "applied",
      applied_on:
        initialValues?.applied_on ??
        new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      notes: initialValues?.notes ?? "",
    }),
    [initialValues]
  );

  const [values, setValues] = useState<ApplicationFormValues>(defaults);
  const [saving, setSaving] = useState(false);

  function fieldError(name: keyof ApplicationFormValues) {
    const msgs = serverErrors?.[name as string];
    return msgs?.[0];
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Company</label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={values.company_name}
          onChange={(e) => setValues((v) => ({ ...v, company_name: e.target.value }))}
        />
        {fieldError("company_name") && (
          <p className="mt-1 text-sm text-red-600">{fieldError("company_name")}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Role</label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={values.role_title}
          onChange={(e) => setValues((v) => ({ ...v, role_title: e.target.value }))}
        />
        {fieldError("role_title") && (
          <p className="mt-1 text-sm text-red-600">{fieldError("role_title")}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={values.status}
            onChange={(e) => {
              const newStatus = e.target.value as (typeof STATUSES)[number];
              setValues((v) => ({ ...v, status: newStatus }));
            }}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {fieldError("status") && (
            <p className="mt-1 text-sm text-red-600">{fieldError("status")}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Applied on</label>
          <input
            type="date"
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={values.applied_on}
            onChange={(e) => setValues((v) => ({ ...v, applied_on: e.target.value }))}
          />
          {fieldError("applied_on") && (
            <p className="mt-1 text-sm text-red-600">{fieldError("applied_on")}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Notes</label>
        <textarea
          className="w-full rounded-md border px-3 py-2 text-sm"
          rows={5}
          value={values.notes}
          onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
        />
        {fieldError("notes") && (
          <p className="mt-1 text-sm text-red-600">{fieldError("notes")}</p>
        )}
      </div>

      <button
        disabled={saving}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        type="submit"
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
