"use client";

import type { Colors } from "./utils";

interface ChecklistItemData {
  id: string;
  label: string;
  subtitle?: string;
  optional?: boolean;
}

interface EmployeeChecklistItemProps {
  c: Colors;
  item: ChecklistItemData;
  activeTabId: string;
  isChecked: boolean;
  isViewing: boolean;
  editData: any;
  setEditData: (data: any) => void;
  onToggleView: (id: string) => void;
  onUpload: (id: string) => void;
}

/**
 * Renders a single document checklist row (with any inline government/company
 * inputs and view/upload actions) for the Employee Edit modal.
 */
export function EmployeeChecklistItem({
  c,
  item,
  activeTabId,
  isChecked,
  isViewing,
  editData,
  setEditData,
  onToggleView,
  onUpload,
}: EmployeeChecklistItemProps) {
  let governmentInput: React.ReactNode = null;

  if (activeTabId === "government" && isChecked) {
    if (item.id === "sss" || item.id === "philhealth" || item.id === "pagibig" || item.id === "tin") {
      const dataKey = item.id === "philhealth" ? "philHealth" : item.id === "pagibig" ? "hdmf" : item.id;
      governmentInput = (
        <div className="mt-1">
          <input
            type="text"
            value={editData[dataKey]}
            onChange={(e) => setEditData({ ...editData, [dataKey]: e.target.value })}
            className="px-2 py-1 text-sm font-mono tracking-wide border rounded w-48 focus:outline-none focus:ring-1 focus:ring-ring bg-white"
            placeholder="Enter ID Number"
          />
        </div>
      );
    } else if (item.id === "nbi" || item.id === "brgy") {
      const dataKey = item.id === "nbi" ? "nbiExpiration" : "barangayExpiration";
      governmentInput = (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium text-gray-500">Expiration Date:</span>
          <input
            type="date"
            value={editData[dataKey]}
            onChange={(e) => setEditData({ ...editData, [dataKey]: e.target.value })}
            className="px-2 py-1 text-xs font-mono border rounded focus:outline-none focus:ring-1 focus:ring-ring bg-white"
          />
        </div>
      );
    }
  }

  if (activeTabId === "company" && isChecked && item.id === "company_id") {
    governmentInput = (
      <div className="mt-1">
        <input
          type="text"
          value={editData.companyIdNumber || ""}
          onChange={(e) => setEditData({ ...editData, companyIdNumber: e.target.value })}
          className="px-2 py-1 text-sm font-mono tracking-wide border rounded w-48 focus:outline-none focus:ring-1 focus:ring-ring bg-white"
          placeholder="Enter Company ID Number"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-2.5 rounded-xl border bg-white transition-all duration-200 hover:shadow-md" style={{ borderColor: isChecked ? '#86efac' : c.cardBorder }}>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <p className="text-sm font-semibold m-0 truncate text-slate-800" style={{ color: c.headingText }}>{item.label}</p>
            {isChecked ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-100 text-green-700 border border-green-200">Submitted</span>
            ) : item.optional ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">Optional</span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-100 text-red-700 border border-red-200">Missing</span>
            )}
          </div>
          {governmentInput ? governmentInput : (item.subtitle && <p className="text-xs font-medium mt-0.5 text-gray-500 truncate">{item.subtitle}</p>)}
        </div>
      </div>

      <div className="flex-shrink-0 ml-4 sm:ml-0 flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
        {isChecked ? (
          <>
            <button onClick={() => onToggleView(isViewing ? "" : item.id)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground bg-muted hover:bg-accent border border-border rounded-md transition-colors w-full sm:w-auto focus:outline-none">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isViewing ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </>
                )}
              </svg>
              {isViewing ? "Hide" : "View Document"}
            </button>
            <button onClick={() => onUpload(item.id)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors w-full sm:w-auto focus:outline-none">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Replace
            </button>
          </>
        ) : (
          <button onClick={() => onUpload(item.id)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors w-full sm:w-auto focus:outline-none">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
