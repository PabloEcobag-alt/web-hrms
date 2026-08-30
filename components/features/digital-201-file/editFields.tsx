"use client";

// Sidebar-style form fields for the employee edit modal.

import { AppSelect } from "@/components/ui/app-select";

export const SideInput = ({ placeholder, value, onChange, type = "text", label, c }: any) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.mutedText }}>{label}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-2.5 py-2 rounded-lg border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-ring transition-colors" style={{ borderColor: c.cardBorder, color: c.bodyText }} />
  </div>
);

export const SideSelect = ({ value, onChange, options, label, c }: any) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.mutedText }}>{label}</label>}
    <AppSelect
      value={value}
      onValueChange={(v) => onChange({ target: { value: v } } as any)}
      options={[{ value: "", label: "None" }, ...options.map((o: string) => ({ value: o, label: o }))]}
      placeholder="None"
      className="w-full"
      triggerClassName="px-2.5 py-2"
    />
  </div>
);

