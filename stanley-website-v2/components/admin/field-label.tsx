"use client";

export function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      className="absolute -top-2 left-3 rounded-full bg-[color:var(--surface)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
