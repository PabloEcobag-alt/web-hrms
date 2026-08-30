"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { type Colors, type PayrollRow, formatCurrency } from "./types";

interface PayrollTableProps {
  c: Colors;
  isDark: boolean;
  readOnly: boolean;
  isMaker: boolean;
  loading: boolean;
  payrollData: PayrollRow[];
  onUpdateBonus: (id: string, value: string) => void;
  onCompute: (row: PayrollRow) => void;
  onFinalize: (row: PayrollRow) => void;
  onOpenDisburse: (row: PayrollRow) => void;
  wrapperClassName?: string;
}

const METHOD_STYLES: Record<string, string> = {
  ATM: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  Cash: "bg-amber-50 text-amber-700 border-amber-200/60",
  GCash: "bg-sky-50 text-sky-700 border-sky-200/60",
};

const STATUS_STYLES: Record<string, string> = {
  Draft: "bg-slate-50 text-slate-700 border-slate-200/60",
  Computed: "bg-amber-50 text-amber-700 border-amber-200/60",
  Finalized: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  Disbursed: "bg-violet-50 text-violet-700 border-violet-200/60",
};

/** Payroll computation table (recruitment-hiring shadcn Table style). */
export function PayrollTable({
  readOnly,
  isMaker,
  loading,
  payrollData,
  onUpdateBonus,
  onCompute,
  onFinalize,
  onOpenDisburse,
  wrapperClassName,
}: PayrollTableProps) {
  if (payrollData.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        No payroll data found.
      </div>
    );
  }

  return (
    <Table className="w-full" wrapperClassName={wrapperClassName}>
      <TableHeader className="bg-background sticky top-0 z-10">
        <TableRow className="border-b border-border">
          {[
            { label: "Employee", w: "w-[220px] min-w-[220px]" },
            { label: "Position", w: "w-[200px] min-w-[200px]" },
            { label: "Basic", w: "w-[110px] min-w-[110px]" },
            { label: "OT", w: "w-[100px] min-w-[100px]" },
            { label: "SSS", w: "w-[110px] min-w-[110px]" },
            { label: "PhilHealth", w: "w-[120px] min-w-[120px]" },
            { label: "Pag-IBIG", w: "w-[110px] min-w-[110px]" },
            { label: "Tax", w: "w-[110px] min-w-[110px]" },
            { label: "Bonus", w: "w-[120px] min-w-[120px]" },
            { label: "Net Pay", w: "w-[130px] min-w-[130px]" },
            { label: "Method", w: "w-[110px] min-w-[110px]" },
            { label: "Status", w: "w-[120px] min-w-[120px]" },
            ...(isMaker ? [{ label: "Actions", w: "w-[220px] min-w-[220px]" }] : []),
          ].map((col) => (
            <TableHead key={col.label} className={`text-base font-medium text-muted-foreground px-5 py-4 whitespace-nowrap ${col.w}`}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {payrollData.map((row) => (
          <TableRow key={row.id} className="hover:bg-muted/50 transition-colors border-b border-border">
            <TableCell className="w-[220px] min-w-[220px] px-5 py-4">
              <span className="font-medium text-base text-foreground whitespace-nowrap">{row.name}</span>
            </TableCell>
            <TableCell className="w-[200px] min-w-[200px] px-5 py-4 text-base font-normal text-muted-foreground whitespace-nowrap">{row.position}</TableCell>
            <TableCell className="w-[110px] min-w-[110px] px-5 py-4 text-base text-foreground">{formatCurrency(row.basic)}</TableCell>
            <TableCell className="w-[100px] min-w-[100px] px-5 py-4 text-base text-emerald-600">{formatCurrency(row.ot)}</TableCell>
            <TableCell className="w-[110px] min-w-[110px] px-5 py-4 text-base text-muted-foreground">{formatCurrency(row.sss)}</TableCell>
            <TableCell className="w-[120px] min-w-[120px] px-5 py-4 text-base text-muted-foreground">{formatCurrency(row.philHealth)}</TableCell>
            <TableCell className="w-[110px] min-w-[110px] px-5 py-4 text-base text-muted-foreground">{formatCurrency(row.pagIbig)}</TableCell>
            <TableCell className="w-[110px] min-w-[110px] px-5 py-4 text-base text-muted-foreground">{formatCurrency(row.tax)}</TableCell>
            <TableCell className="w-[120px] min-w-[120px] px-5 py-4">
              {readOnly ? (
                <span className="text-base text-foreground">{formatCurrency(row.bonus)}</span>
              ) : (
                <input
                  type="number"
                  value={row.bonus || ""}
                  onChange={(e) => onUpdateBonus(row.id, e.target.value)}
                  placeholder="0"
                  className="w-24 px-2.5 py-1.5 rounded-lg border border-border bg-white text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                />
              )}
            </TableCell>
            <TableCell className="w-[130px] min-w-[130px] px-5 py-4 text-base font-semibold text-foreground">{formatCurrency(row.netPay)}</TableCell>
            <TableCell className="w-[110px] min-w-[110px] px-5 py-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${METHOD_STYLES[row.payoutMethod] || "bg-slate-50 text-slate-700 border-slate-200/60"}`}>
                {row.payoutMethod}
              </span>
            </TableCell>
            <TableCell className="w-[120px] min-w-[120px] px-5 py-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[row.status ?? "Draft"] || "bg-slate-50 text-slate-700 border-slate-200/60"}`}>
                {row.status ?? "Draft"}
              </span>
            </TableCell>
            {isMaker && (
              <TableCell className="w-[220px] min-w-[220px] px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onCompute(row)}
                    disabled={loading}
                    className="px-2.5 py-1 rounded-md border border-border bg-white text-foreground text-xs font-medium transition-colors hover:bg-muted disabled:opacity-50"
                    title="Compute"
                  >
                    Compute
                  </button>
                  <button
                    onClick={() => onFinalize(row)}
                    disabled={!row.status || row.status === "Finalized" || row.status === "Disbursed"}
                    className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium transition-colors hover:bg-primary/90 disabled:opacity-50"
                    title="Finalize"
                  >
                    Finalize
                  </button>
                  <button
                    onClick={() => onOpenDisburse(row)}
                    disabled={row.status !== "Finalized"}
                    className="px-2.5 py-1 rounded-md bg-violet-600 text-white text-xs font-medium transition-colors hover:bg-violet-700 disabled:opacity-50"
                    title="Disburse via GCash"
                  >
                    Disburse
                  </button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
