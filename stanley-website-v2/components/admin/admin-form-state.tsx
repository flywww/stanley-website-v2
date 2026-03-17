"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AdminFormStateContextValue = {
  activeUploads: number;
  beginUpload: () => void;
  endUpload: () => void;
};

const AdminFormStateContext = createContext<AdminFormStateContextValue | null>(null);

export function AdminFormProvider({ children }: { children: ReactNode }) {
  const [activeUploads, setActiveUploads] = useState(0);

  const value = useMemo<AdminFormStateContextValue>(
    () => ({
      activeUploads,
      beginUpload: () => setActiveUploads((count) => count + 1),
      endUpload: () => setActiveUploads((count) => Math.max(0, count - 1)),
    }),
    [activeUploads],
  );

  return <AdminFormStateContext.Provider value={value}>{children}</AdminFormStateContext.Provider>;
}

export function useAdminFormState() {
  return useContext(AdminFormStateContext);
}
