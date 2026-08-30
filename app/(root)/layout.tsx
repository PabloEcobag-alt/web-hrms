"use client";

import { AuthProvider } from "@/context/AuthContext";
import { AppShell } from "@/components/shared/AppShell";
import { Toaster } from "sonner";

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RootLayoutInner>{children}</RootLayoutInner>
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}

