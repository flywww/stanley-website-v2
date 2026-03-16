"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function parseMetricValue(value: string) {
  const match = value.match(/^([^\d-]*)(-?\d+)(.*)$/);

  if (!match) {
    return null;
  }

  return {
    prefix: match[1],
    number: Number.parseInt(match[2], 10),
    suffix: match[3],
  };
}

export function CountUpValue({ value }: { value: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const lastRenderedValueRef = useRef(-1);
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(parsed ? 0 : value);

  useEffect(() => {
    if (!parsed || !spanRef.current || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(spanRef.current);

    return () => observer.disconnect();
  }, [isVisible, parsed]);

  useEffect(() => {
    if (!parsed || !isVisible) {
      return;
    }

    let frameId = 0;
    const durationMs = 950;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const nextValue = Math.round(parsed.number * progress);

      if (lastRenderedValueRef.current !== nextValue) {
        lastRenderedValueRef.current = nextValue;
        setDisplayValue(nextValue);
      }

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, parsed]);

  if (!parsed) {
    return (
      <span
        ref={spanRef}
        className="inline-block min-w-[2ch] text-center"
        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
      >
        {value}
      </span>
    );
  }

  return (
    <span
      ref={spanRef}
      suppressHydrationWarning
      className="inline-block min-w-[2ch] text-center"
      style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
    >
      {parsed.prefix}
      {displayValue}
      {parsed.suffix}
    </span>
  );
}
