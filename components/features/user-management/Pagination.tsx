"use client";

import { AppSelect } from "@/components/ui/app-select";
import { getPageNumbers } from "./utils";

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  safePage: number;
  totalPages: number;
  startIndex: number;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
}

/**
 * Pagination controls extracted from ViewUserManagement.
 * Handles rows-per-page selection and page navigation.
 */
export function Pagination({
  totalItems,
  pageSize,
  safePage,
  totalPages,
  startIndex,
  onPageSizeChange,
  onPageChange,
}: PaginationProps) {
  if (totalItems <= 0) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      borderTop: "1px solid #e5e7eb",
      backgroundColor: "#ffffff",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 13, color: "#6b7280" }}>Rows per page:</span>
        <AppSelect
          value={String(pageSize)}
          onValueChange={(v) => onPageSizeChange(Number(v))}
          className="w-[72px]"
          options={[
            { value: "5", label: "5" },
            { value: "10", label: "10" },
            { value: "25", label: "25" },
            { value: "50", label: "50" },
          ]}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13, color: "#6b7280" }}>
          {totalItems === 0 ? "0" : `${startIndex + 1}-${Math.min(startIndex + pageSize, totalItems)}`} of {totalItems}
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => onPageChange(1)}
            disabled={safePage <= 1}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              color: safePage <= 1 ? "#9ca3af" : "#1f2937",
              cursor: safePage <= 1 ? "not-allowed" : "pointer",
              fontSize: 13,
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => onPageChange(Math.max(1, safePage - 1))}
            disabled={safePage <= 1}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              color: safePage <= 1 ? "#9ca3af" : "#1f2937",
              cursor: safePage <= 1 ? "not-allowed" : "pointer",
              fontSize: 13,
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {getPageNumbers(safePage, totalPages).map((pageNum, idx) =>
            pageNum === "..." ? (
              <span key={`ellipsis-${idx}`} style={{ padding: "6px 10px", color: "#6b7280", fontSize: 13 }}>
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum as number)}
                disabled={pageNum === safePage}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: pageNum === safePage ? "1px solid #2563eb" : "1px solid #e5e7eb",
                  background: pageNum === safePage ? "#2563eb" : "#ffffff",
                  color: pageNum === safePage ? "#ffffff" : "#1f2937",
                  cursor: pageNum === safePage ? "default" : "pointer",
                  fontSize: 13,
                  fontWeight: pageNum === safePage ? 600 : 400,
                }}
              >
                {pageNum}
              </button>
            )
          )}
          <button
            onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
            disabled={safePage >= totalPages}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              color: safePage >= totalPages ? "#9ca3af" : "#1f2937",
              cursor: safePage >= totalPages ? "not-allowed" : "pointer",
              fontSize: 13,
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={safePage >= totalPages}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              color: safePage >= totalPages ? "#9ca3af" : "#1f2937",
              cursor: safePage >= totalPages ? "not-allowed" : "pointer",
              fontSize: 13,
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
