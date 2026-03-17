"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";

import { useAdminFormState } from "@/components/admin/admin-form-state";

function sanitizeSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_.]+/g, "-")
    .replace(/^-+|-+$/g, "") || "file";
}

function buildPath({
  fileName,
  kind,
  rootPath,
  slugFieldId,
}: {
  fileName: string;
  kind: string;
  rootPath: string;
  slugFieldId?: string;
}) {
  const extension = fileName.includes(".") ? `.${fileName.split(".").pop()}` : "";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const safeFileName = `${sanitizeSegment(baseName)}${extension.toLowerCase()}`;

  if (!slugFieldId) {
    return `${rootPath}/${kind}/${safeFileName}`;
  }

  const slugInput = document.getElementById(slugFieldId) as HTMLInputElement | null;
  const slug = sanitizeSegment(slugInput?.value ?? "draft");
  return `${rootPath}/${slug}/${kind}/${safeFileName}`;
}

export function ImageUploadField({
  description,
  initialValue = "",
  kind,
  label,
  name,
  rootPath,
  slugFieldId,
}: {
  description?: string;
  initialValue?: string;
  kind: string;
  label: string;
  name: string;
  rootPath: string;
  slugFieldId?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [value, setValue] = useState(initialValue);
  const formState = useAdminFormState();

  async function handleUpload() {
    const file = inputRef.current?.files?.[0];

    if (!file) {
      setError("Choose an image first.");
      return;
    }

    setError(null);
    setStatus("Uploading image...");
    setIsUploading(true);
    formState?.beginUpload();

    try {
      const blob = await upload(
        buildPath({
          fileName: file.name,
          kind,
          rootPath,
          slugFieldId,
        }),
        file,
        {
          access: "public",
          handleUploadUrl: "/api/uploads/images",
        },
      );

      setValue(blob.url);
      setStatus("Upload complete. Save to persist the change.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
      setStatus(null);
    } finally {
      setIsUploading(false);
      formState?.endUpload();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-3 rounded-[18px] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {description ? <p className="mt-1 text-sm text-[color:var(--muted)]">{description}</p> : null}
      </div>
      <input
        className="w-full rounded-[14px] border border-[color:var(--line)] bg-transparent px-3 py-2 text-sm"
        name={name}
        onChange={(event) => {
          setValue(event.target.value);
          setStatus(null);
        }}
        placeholder="https://... or /images/..."
        type="text"
        value={value}
      />
      {value ? (
        <div className="overflow-hidden rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={label} className="max-h-48 rounded-[10px] object-cover" src={value} />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <input ref={inputRef} accept="image/jpeg,image/png,image/webp" type="file" />
        <button
          className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-semibold transition duration-150 hover:border-[color:var(--accent)] hover:bg-[color:var(--surface-strong)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isUploading}
          onClick={handleUpload}
          type="button"
        >
          {isUploading ? "Uploading..." : "Upload image"}
        </button>
      </div>
      {status ? (
        <p
          aria-live="polite"
          className={`text-sm ${isUploading ? "text-[color:var(--accent)]" : "text-emerald-600 dark:text-emerald-300"}`}
        >
          {status}
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-600 dark:text-red-300">{error}</p> : null}
    </div>
  );
}
