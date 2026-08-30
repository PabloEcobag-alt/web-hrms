"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AppSelect } from "@/components/ui/app-select";
import type { Employee } from "./types";
import type { Colors } from "./utils";
import { EmployeeTable } from "./EmployeeTables";

interface TabEntry {
  key: string;
  label: string;
  count: number;
}

interface AdminEmployeeListSectionProps {
  c: Colors;
  isAdmin: boolean;
  searchName: string;
  onSearchNameChange: (v: string) => void;
  activeTab: string;
  onActiveTabChange: (v: string) => void;
  tabs: TabEntry[];
  paginatedEmployees: Employee[];
  onViewFile: (e: Employee) => void;
  onEditFile: (e: Employee) => void;
  totalItems: number;
  pageSize: number;
  startIndex: number;
  safePage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

/**
 * The admin employee list card: header, search + status filter, table, pagination.
 */
export function AdminEmployeeListSection({
  c,
  isAdmin,
  searchName,
  onSearchNameChange,
  activeTab,
  onActiveTabChange,
  tabs,
  paginatedEmployees,
  onViewFile,
  onEditFile,
  totalItems,
  pageSize,
  startIndex,
  safePage,
  totalPages,
  onPrevPage,
  onNextPage,
}: AdminEmployeeListSectionProps) {
  return (
    <div className="border border-border rounded-lg bg-white shadow-xs overflow-hidden p-6 space-y-6">
      {/* Container Header & Filters Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-3">
          <h2 className="text-base font-semibold text-foreground m-0">All Employees</h2>
          <p className="text-sm text-muted-foreground font-normal m-0">
            {totalItems} employee{totalItems !== 1 ? "s" : ""} registered
          </p>
        </div>

        {/* Search + Status Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-2.5">
          <div className="relative w-full md:flex-1 min-w-[140px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => onSearchNameChange(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 text-sm sm:text-base border border-border rounded-lg bg-white focus:outline-none"
            />
          </div>
          <AppSelect
            ariaLabel="Filter by status"
            value={activeTab}
            onValueChange={onActiveTabChange}
            options={tabs.map((tab) => ({ value: tab.key, label: `${tab.label} (${tab.count})` }))}
            className="min-w-[180px] shrink-0"
            triggerClassName="md:px-3.5 md:py-2 sm:text-sm"
          />
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto overflow-y-auto max-h-[600px] border border-border rounded-lg bg-white">
        <EmployeeTable employees={paginatedEmployees} c={c} onViewFile={onViewFile} onEditFile={onEditFile} isAdmin={isAdmin} />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-base text-muted-foreground">
          Showing {totalItems === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} of {totalItems} employees
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
    </div>
  );
}
