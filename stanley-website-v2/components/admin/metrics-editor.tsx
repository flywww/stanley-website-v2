"use client";

import { useMemo, useState } from "react";

import { FieldLabel } from "@/components/admin/field-label";

type MetricItem = {
  id?: string;
  label: string;
  value: string;
  sortOrder: number;
};

export function MetricsEditor({
  initialItems,
  inputName = "metricsJson",
}: {
  initialItems: MetricItem[];
  inputName?: string;
}) {
  const [items, setItems] = useState<MetricItem[]>(initialItems);
  const serialized = useMemo(() => JSON.stringify(items), [items]);

  return (
    <div className="space-y-4">
      <input name={inputName} type="hidden" value={serialized} />
      {items.map((item, index) => (
        <div key={item.id ?? `metric-${index}`} className="flex flex-wrap items-end gap-4 rounded-[18px] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
          <div className="relative min-w-0 flex-[1_1_280px]">
            <FieldLabel htmlFor={`metric-label-${index}`}>Label</FieldLabel>
            <input
              id={`metric-label-${index}`}
              className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], label: event.target.value };
                setItems(next);
              }}
              placeholder="Label"
              type="text"
              value={item.label}
            />
          </div>
          <div className="relative min-w-0 flex-[1_1_220px]">
            <FieldLabel htmlFor={`metric-value-${index}`}>Value</FieldLabel>
            <input
              id={`metric-value-${index}`}
              className="w-full rounded-[12px] border border-[color:var(--line)] bg-transparent px-3 py-2"
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], value: event.target.value };
                setItems(next);
              }}
              placeholder="Value"
              type="text"
              value={item.value}
            />
          </div>
          <div className="relative w-36 shrink-0">
            <FieldLabel htmlFor={`metric-order-${index}`}>Sort order</FieldLabel>
            <input
              id={`metric-order-${index}`}
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
            className="h-11 w-28 shrink-0 rounded-full border border-[color:var(--line)] px-4 py-2 text-sm whitespace-nowrap transition duration-150 hover:border-[color:var(--accent)] hover:bg-[color:var(--surface-strong)] active:scale-[0.98]"
            onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}
            type="button"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-semibold"
        onClick={() =>
          setItems((current) => [
            ...current,
            {
              label: "",
              value: "",
              sortOrder: current.length,
            },
          ])
        }
        type="button"
      >
        Add metric
      </button>
    </div>
  );
}
