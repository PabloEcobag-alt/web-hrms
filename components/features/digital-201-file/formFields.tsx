"use client";

// Reusable form-field primitives shared by the Add/Edit employee modals.

import { AppSelect } from "@/components/ui/app-select";

export const TextInput = ({ label, required, value, onChange, error, c, type = "text", isTextArea = false, placeholder }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-semibold" style={{ color: c.headingText }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {isTextArea ? (
      <textarea
        value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full p-2.5 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${error ? 'border-red-500' : ''}`}
        style={{ borderColor: error ? undefined : c.cardBorder, color: c.bodyText }}
        rows={3}
      />
    ) : (
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full p-2.5 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${error ? 'border-red-500' : ''}`}
        style={{ borderColor: error ? undefined : c.cardBorder, color: c.bodyText }}
      />
    )}
    {error && <span className="text-[10px] text-red-500">This field is required</span>}
  </div>
);

export const SelectInput = ({ label, options, required, value, onChange, error, c }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-semibold" style={{ color: c.headingText }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <AppSelect
      value={value}
      onValueChange={(v) => onChange({ target: { value: v } } as any)}
      options={[{ value: "", label: "Select an option" }, ...options.map((o: string) => ({ value: o, label: o }))]}
      placeholder="Select an option"
      className="w-full"
      triggerClassName={`p-2.5 text-sm ${error ? 'border-red-500' : ''}`}
    />
    {error && <span className="text-[10px] text-red-500">This field is required</span>}
  </div>
);

export const FileUploadField = ({ label, optional, c }: any) => (
  <div className="flex flex-col gap-1.5 p-3 rounded-lg border bg-gray-50/50" style={{ borderColor: c.cardBorder }}>
    <label className="text-xs font-semibold truncate" style={{ color: c.headingText }} title={label}>
      {label} {optional && <span className="font-normal text-gray-500 ml-1">(Optional)</span>}
    </label>
    <button className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed rounded-lg text-[11px] font-bold transition-colors hover:bg-gray-100" style={{ borderColor: c.mutedText, color: c.mutedText }}>
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      Upload File
    </button>
  </div>
);

export const GovDocRow = ({ title, inputLabel, value, onChange, type, placeholder, c }: any) => (
  <div className="flex flex-col p-4 rounded-xl border bg-white gap-3" style={{ borderColor: c.cardBorder }}>
    <h4 className="text-sm font-bold" style={{ color: c.headingText }}>{title}</h4>
    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
      <div className="flex-1">
        <TextInput label={inputLabel} value={value} onChange={(e: any) => onChange(e.target.value)} type={type} placeholder={placeholder} c={c} />
      </div>
      <div className="sm:w-48 flex-shrink-0">
        <FileUploadField label="Document Proof" c={c} />
      </div>
    </div>
  </div>
);

