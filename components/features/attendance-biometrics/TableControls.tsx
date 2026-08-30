"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSelect } from "@/components/ui/app-select";

export interface FilterConfig {
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
  options: string[];
  minWidth?: string;
}

/**
 * Search bar + filter dropdowns toolbar, styled to match the
 * Recruitment & Hiring table section.
 */
export function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search by name...",
  filters = [],
  countLabel,
  trailing,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  countLabel?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="space-y-4">
      {countLabel && (
        <div className="flex items-center justify-end border-b border-border pb-1">
          <p className="text-sm text-muted-foreground font-normal pb-3 m-0">{countLabel}</p>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center gap-2.5 pt-2">
        <div className="relative w-full md:flex-1 min-w-[140px]">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 text-sm sm:text-base border border-border rounded-lg bg-white focus:outline-none"
          />
        </div>

        {(filters.length > 0 || trailing) && (
          <div className="flex flex-row items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none shrink-0">
            {filters.map((f, i) => (
              <AppSelect
                key={i}
                value={f.value}
                onValueChange={f.onChange}
                options={[
                  { value: "", label: f.allLabel },
                  ...f.options.map((o) => ({ value: o, label: o })),
                ]}
                triggerClassName="md:px-3.5 md:py-2 sm:text-sm"
                className={`shrink-0 ${f.minWidth ?? "min-w-[115px]"}`}
              />
            ))}
            {trailing}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Pagination footer styled to match the Recruitment & Hiring table section.
 */
export function TablePagination({
  totalItems,
  pageSize,
  startIndex,
  safePage,
  totalPages,
  itemLabel = "records",
  onPrevPage,
  onNextPage,
}: {
  totalItems: number;
  pageSize: number;
  startIndex: number;
  safePage: number;
  totalPages: number;
  itemLabel?: string;
  onPrevPage: () => void;
  onNextPage: () => void;
}) {
  return (
    <div className="flex items-center justify-between pt-1">
      <p className="text-base text-muted-foreground">
        Showing {totalItems === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} of {totalItems} {itemLabel}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPrevPage} disabled={safePage <= 1} className="h-9 px-3 text-base">
          <ChevronLeft className="w-4.5 h-4.5" />
        </Button>
        <span className="text-base font-semibold text-foreground px-2">
          {safePage} / {totalPages}
        </span>
        <Button variant="outline" size="sm" onClick={onNextPage} disabled={safePage >= totalPages} className="h-9 px-3 text-base">
          <ChevronRight className="w-4.5 h-4.5" />
        </Button>
      </div>
    </div>
  );
}
