export function AdminFlash({
  error,
  saved,
}: {
  error?: string;
  saved?: string;
}) {
  if (!error && !saved) {
    return null;
  }

  const isError = Boolean(error);
  const message = error ?? "Changes saved.";

  return (
    <div
      className={`rounded-[18px] border px-4 py-3 text-sm ${
        isError
          ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
          : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
      }`}
    >
      {message}
    </div>
  );
}
