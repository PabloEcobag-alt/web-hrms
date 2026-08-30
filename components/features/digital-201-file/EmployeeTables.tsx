"use client";

import { MoreVertical, Eye, Pencil, Ban } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { Employee, PendingHire } from "./types";
import { useColors } from "./utils";
import { StatusBadge } from "./badges";

export function EmployeeTable({ employees, onViewFile, onEditFile, onDeactivate, isAdmin }: {
  employees: Employee[];
  c?: ReturnType<typeof useColors>;
  onViewFile: (employee: Employee) => void;
  onEditFile: (employee: Employee) => void;
  onDeactivate?: (employee: Employee) => void;
  isAdmin: boolean;
}) {
  if (!employees.length) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        No employees match the current filters.
      </div>
    );
  }

  return (
    <Table className="w-full">
      <TableHeader className="bg-background sticky top-0 z-10">
        <TableRow className="border-b border-border">
          <TableHead className="w-[320px] min-w-[320px] text-base font-medium text-muted-foreground px-5 py-4">Name</TableHead>
          <TableHead className="w-[220px] min-w-[220px] text-base font-medium text-muted-foreground px-5 py-4">Job Position</TableHead>
          <TableHead className="w-[200px] min-w-[200px] text-base font-medium text-muted-foreground px-5 py-4">Assigned Location</TableHead>
          <TableHead className="w-[200px] min-w-[200px] text-base font-medium text-muted-foreground px-5 py-4">Supervisor</TableHead>
          <TableHead className="w-[160px] min-w-[160px] text-base font-medium text-muted-foreground px-5 py-4">Status</TableHead>
          <TableHead className="w-[60px] min-w-[60px] px-2 py-4 text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow
            key={employee.id}
            onClick={() => onViewFile(employee)}
            className="cursor-pointer hover:bg-muted/50 transition-colors border-b border-border"
          >
            <TableCell className="w-[320px] min-w-[320px] px-5 py-4">
              <div>
                <span className="font-medium text-lg text-foreground hover:underline block">{employee.name}</span>
                <span className="text-sm text-muted-foreground block">{employee.email}</span>
              </div>
            </TableCell>
            <TableCell className="w-[220px] min-w-[220px] px-5 py-4 text-base font-normal text-foreground">
              {employee.position}
            </TableCell>
            <TableCell className="w-[200px] min-w-[200px] px-5 py-4 text-base font-normal text-muted-foreground">
              {employee.assignedLocation || "—"}
            </TableCell>
            <TableCell className="w-[200px] min-w-[200px] px-5 py-4 text-base font-normal text-muted-foreground">
              {employee.supervisor || "—"}
            </TableCell>
            <TableCell className="w-[160px] min-w-[160px] px-5 py-4">
              <StatusBadge status={employee.status} />
            </TableCell>
            <TableCell
              className="w-[60px] min-w-[60px] px-2 py-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Row actions"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 rounded-lg border border-border bg-white p-1.5 shadow-md">
                  <DropdownMenuItem
                    onClick={() => onViewFile(employee)}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-normal text-black hover:bg-muted"
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>View File</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => onEditFile(employee)}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-normal text-black hover:bg-muted"
                    >
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  )}
                  {isAdmin && onDeactivate && (
                    <DropdownMenuItem
                      onClick={() => onDeactivate(employee)}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-normal text-red-600 hover:bg-red-50"
                    >
                      <Ban className="h-4 w-4" />
                      <span>Deactivate</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PendingHireTable({ pendingHires, onReview }: {
  pendingHires: PendingHire[];
  c?: ReturnType<typeof useColors>;
  onReview: (hire: PendingHire) => void;
}) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
  };

  if (!pendingHires.length) {
    return (
      <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-muted-foreground">
        No pending hires to review.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-white sticky top-0 z-10">
            <TableRow className="border-b border-border">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-4">Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-4">Applied Position</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-4">Department</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-4">Offer Accepted</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-4">Contact</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingHires.map((hire) => (
              <TableRow key={hire.id} className="border-b border-border transition-colors hover:bg-muted/50">
                <TableCell className="px-5 py-4">
                  <span className="font-medium text-foreground">{hire.lastName}, {hire.firstName}</span>
                </TableCell>
                <TableCell className="px-5 py-4 text-sm text-foreground">{hire.position}</TableCell>
                <TableCell className="px-5 py-4 text-sm text-muted-foreground">{hire.department}</TableCell>
                <TableCell className="px-5 py-4 text-sm text-muted-foreground">{formatDate(hire.offerAcceptedDate)}</TableCell>
                <TableCell className="px-5 py-4 text-sm text-muted-foreground">
                  {hire.email}
                  <span className="block text-xs text-muted-foreground">{hire.phone}</span>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <button
                    onClick={() => onReview(hire)}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-accent"
                  >
                    Review &amp; Onboard
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
