"use client";

import { useMemo, useState } from "react";

import { FieldLabel } from "@/components/admin/field-label";

type SkillItem = {
  id?: string;
  title: string;
  description: string;
  sortOrder: number;
};

export function SkillsEditor({
  initialItems,
  inputName = "skillsJson",
}: {
  initialItems: SkillItem[];
  inputName?: string;
}) {
  const [items, setItems] = useState<SkillItem[]>(initialItems);
  const serialized = useMemo(() => JSON.stringify(items), [items]);

  return (
    <div className="space-y-4">
      <input name={inputName} type="hidden" value={serialized} />
      {items.map((item, index) => (
        <div key={item.id ?? `skill-${index}`} className="space-y-3 rounded-[18px] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_144px_auto] md:items-end">
            <div className="relative min-w-0">
              <FieldLabel htmlFor={`skill-title-${index}`}>Title</FieldLabel>
              <input
                id={`skill-title-${index}`}
                className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
                onChange={(event) => {
                  const next = [...items];
                  next[index] = { ...next[index], title: event.target.value };
                  setItems(next);
                }}
                placeholder="Title"
                type="text"
                value={item.title}
              />
            </div>
            <div className="relative min-w-0">
              <FieldLabel htmlFor={`skill-order-${index}`}>Sort order</FieldLabel>
              <input
                id={`skill-order-${index}`}
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
            <FieldLabel htmlFor={`skill-description-${index}`}>Description</FieldLabel>
            <textarea
              id={`skill-description-${index}`}
              className="min-h-24 w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], description: event.target.value };
                setItems(next);
              }}
              value={item.description}
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
              title: "",
              description: "",
              sortOrder: current.length,
            },
          ])
        }
        type="button"
      >
        Add skill
      </button>
    </div>
  );
}
