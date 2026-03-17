"use client";

import { useFormStatus } from "react-dom";

import { useAdminFormState } from "@/components/admin/admin-form-state";

export function AdminSubmitButton({
  idleLabel,
  pendingLabel = "Saving...",
  uploadsActiveLabel = "Finish uploads first",
  className = "",
}: {
  idleLabel: string;
  pendingLabel?: string;
  uploadsActiveLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  const formState = useAdminFormState();
  const uploadsActive = (formState?.activeUploads ?? 0) > 0;
  const disabled = pending || uploadsActive;

  let label = idleLabel;

  if (uploadsActive) {
    label = uploadsActiveLabel;
  } else if (pending) {
    label = pendingLabel;
  }

  return (
    <button
      className={`rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white transition duration-150 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${className}`.trim()}
      disabled={disabled}
      type="submit"
    >
      {label}
    </button>
  );
}
