"use client";

import { upload } from "@vercel/blob/client";
import { useMemo, useState } from "react";

import { FieldLabel } from "@/components/admin/field-label";
import { useAdminFormState } from "@/components/admin/admin-form-state";

type GalleryItem = {
  id?: string;
  src: string;
  alt: string;
  sortOrder: number;
};

function sanitizeSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_.]+/g, "-")
    .replace(/^-+|-+$/g, "") || "file";
}

export function GalleryEditor({
  initialItems,
  inputName = "galleryJson",
  slugFieldId,
}: {
  initialItems: GalleryItem[];
  inputName?: string;
  slugFieldId: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const serialized = useMemo(() => JSON.stringify(items), [items]);
  const formState = useAdminFormState();

  async function uploadImage(index: number, file: File) {
    const slugInput = document.getElementById(slugFieldId) as HTMLInputElement | null;
    const slug = sanitizeSegment(slugInput?.value ?? "draft");
    const extension = file.name.includes(".") ? `.${file.name.split(".").pop()}` : "";
    const pathname = `projects/${slug}/gallery/${sanitizeSegment(file.name.replace(/\.[^.]+$/, ""))}${extension.toLowerCase()}`;

    const blob = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: "/api/uploads/images",
    });

    const next = [...items];
    next[index] = { ...next[index], src: blob.url };
    setItems(next);
  }

  return (
    <div className="space-y-4">
      <input name={inputName} type="hidden" value={serialized} />
      {items.map((item, index) => (
        <div key={item.id ?? `gallery-${index}`} className="space-y-3 rounded-[18px] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_144px_auto] md:items-end">
            <div className="relative min-w-0">
              <FieldLabel htmlFor={`gallery-src-${index}`}>Image URL</FieldLabel>
              <input
                id={`gallery-src-${index}`}
                className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...next[index], src: event.target.value };
                  setItems(next);
                  setStatus(null);
                }}
                placeholder="https://... or /images/..."
                type="text"
                value={item.src}
              />
            </div>
            <div className="relative min-w-0">
              <FieldLabel htmlFor={`gallery-order-${index}`}>Sort order</FieldLabel>
              <input
                id={`gallery-order-${index}`}
                className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...next[index], sortOrder: Number(event.target.value) };
                  setItems(next);
                }}
                type="number"
                value={item.sortOrder}
              />
            </div>
            <button
              className="self-end rounded-full border border-[color:var(--line)] px-4 py-2 text-sm whitespace-nowrap transition duration-150 hover:border-[color:var(--accent)] hover:bg-[color:var(--surface-strong)] active:scale-[0.98]"
              onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}
              type="button"
            >
              Remove
            </button>
          </div>
          <div className="relative">
            <FieldLabel htmlFor={`gallery-alt-${index}`}>Alt text</FieldLabel>
            <input
              id={`gallery-alt-${index}`}
              className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], alt: event.target.value };
                setItems(next);
                setStatus(null);
              }}
              placeholder="Alt text"
              type="text"
              value={item.alt}
            />
          </div>
          {item.src ? (
            <div className="overflow-hidden rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={item.alt || "Gallery image"} className="max-h-48 rounded-[10px] object-cover" src={item.src} />
            </div>
          ) : null}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]">
              Upload replacement image
            </p>
            <input
              id={`gallery-file-${index}`}
              accept="image/jpeg,image/png,image/webp"
              className="block w-full text-sm text-[color:var(--muted)] file:mr-3 file:rounded-full file:border file:border-[color:var(--line)] file:bg-[color:var(--surface)] file:px-4 file:py-2 file:font-semibold file:text-[color:var(--foreground)] file:transition file:duration-150 hover:file:border-[color:var(--accent)] hover:file:bg-[color:var(--surface-strong)]"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;

                setError(null);
                setStatus(`Uploading image ${index + 1}...`);
                setUploadingIndex(index);
                formState?.beginUpload();

                try {
                  await uploadImage(index, file);
                  setStatus(`Image ${index + 1} uploaded. Save to persist the gallery.`);
                } catch (uploadError) {
                  setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
                  setStatus(null);
                } finally {
                  setUploadingIndex(null);
                  formState?.endUpload();
                  event.target.value = "";
                }
              }}
              disabled={uploadingIndex === index}
              type="file"
            />
          </div>
        </div>
      ))}
      <button
        className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-semibold transition duration-150 hover:border-[color:var(--accent)] hover:bg-[color:var(--surface-strong)] active:scale-[0.98]"
        onClick={() =>
          setItems((current) => [
            ...current,
            {
              src: "",
              alt: "",
              sortOrder: current.length,
            },
          ])
        }
        type="button"
        >
        Add gallery image
      </button>
      {status ? (
        <p
          aria-live="polite"
          className={`text-sm ${uploadingIndex !== null ? "text-[color:var(--accent)]" : "text-emerald-600 dark:text-emerald-300"}`}
        >
          {status}
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-600 dark:text-red-300">{error}</p> : null}
    </div>
  );
}
