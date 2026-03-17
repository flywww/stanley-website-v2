"use client";

import { useMemo, useState } from "react";

import { FieldLabel } from "@/components/admin/field-label";

type ExperienceItem = {
  id?: string;
  company: string;
  role: string;
  time: string;
  bullets: string[];
  sortOrder: number;
};

export function ExperienceEditor({
  initialItems,
  inputName = "experienceJson",
}: {
  initialItems: ExperienceItem[];
  inputName?: string;
}) {
  const [items, setItems] = useState<ExperienceItem[]>(initialItems);
  const serialized = useMemo(() => JSON.stringify(items), [items]);

  return (
    <div className="space-y-4">
      <input name={inputName} type="hidden" value={serialized} />
      {items.map((item, index) => (
        <div key={item.id ?? `experience-${index}`} className="space-y-3 rounded-[18px] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_184px_144px_auto] md:items-end">
            <div className="relative min-w-0">
              <FieldLabel htmlFor={`experience-company-${index}`}>Company</FieldLabel>
              <input
                id={`experience-company-${index}`}
                className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...next[index], company: event.target.value };
                  setItems(next);
                }}
                placeholder="Company"
                type="text"
                value={item.company}
              />
            </div>
            <div className="relative min-w-0">
              <FieldLabel htmlFor={`experience-role-${index}`}>Role</FieldLabel>
              <input
                id={`experience-role-${index}`}
                className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...next[index], role: event.target.value };
                  setItems(next);
                }}
                placeholder="Role"
                type="text"
                value={item.role}
              />
            </div>
            <div className="relative min-w-0">
              <FieldLabel htmlFor={`experience-time-${index}`}>Time period</FieldLabel>
              <input
                id={`experience-time-${index}`}
                className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...next[index], time: event.target.value };
                  setItems(next);
                }}
                placeholder="2018-present"
                type="text"
                value={item.time}
              />
            </div>
            <div className="relative min-w-0">
              <FieldLabel htmlFor={`experience-order-${index}`}>Sort order</FieldLabel>
              <input
                id={`experience-order-${index}`}
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
            <FieldLabel htmlFor={`experience-bullets-${index}`}>Bullets</FieldLabel>
            <textarea
              id={`experience-bullets-${index}`}
              className="min-h-28 w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
              onChange={(event) => {
                const next = [...items];
                next[index] = {
                  ...next[index],
                  bullets: event.target.value.split("\n").map((bullet) => bullet.trim()).filter(Boolean),
                };
                setItems(next);
              }}
              placeholder="One bullet per line"
              value={item.bullets.join("\n")}
            />
          </div>
        </div>
      ))}
      <button
        className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-semibold"
        onClick={() =>
          setItems((current) => [
            ...current,
            {
              company: "",
              role: "",
              time: "",
              bullets: [],
              sortOrder: current.length,
            },
          ])
        }
        type="button"
      >
        Add experience item
      </button>
    </div>
  );
}
