"use client";

import { useEffect } from "react";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return <>{children}</>;
}
