"use client";

import React, { useState } from "react";
import {
  computePayroll,
  finalizePayroll,
  type PayrollComputeResultDto,
  type PayrollFinalizeRequestDto,
} from "@/lib/services";

export default function PayrollTestPage() {
  const [employeeId, setEmployeeId] = useState<string>("1");
  const [cutoffDate, setCutoffDate] = useState<string>("2026-04-25");

  const [computeResult, setComputeResult] =
    useState<PayrollComputeResultDto | null>(null);
  const [finalizeResult, setFinalizeResult] = useState<object | null>(null);

  const [loadingCompute, setLoadingCompute] = useState(false);
  const [loadingFinalize, setLoadingFinalize] = useState(false);

  const [computeError, setComputeError] = useState<string>("");
  const [finalizeError, setFinalizeError] = useState<string>("");

  const handleCompute = async () => {
    setLoadingCompute(true);
    setComputeError("");
    setComputeResult(null);
    setFinalizeResult(null);
    setFinalizeError("");
    try {
      const result = await computePayroll(Number(employeeId), cutoffDate);
      setComputeResult(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setComputeError(`Compute failed: ${msg}`);
    } finally {
      setLoadingCompute(false);
    }
  };

  const handleFinalize = async () => {
    if (!computeResult) {
      setFinalizeError("Run Compute first to get payroll data.");
      return;
    }
    setLoadingFinalize(true);
    setFinalizeError("");
    setFinalizeResult(null);
    try {
      const dto: PayrollFinalizeRequestDto = {
        Employee_Id: Number(employeeId) || computeResult.Employee_Id,
        Payroll_Run_Id: 1,
        Basic_Pay: computeResult.Basic_Pay,
        OT_Pay: computeResult.OT_Pay,
        Sss_Deduction: computeResult.Sss_Deduction,
        PhilHealth_Deduction: computeResult.PhilHealth_Deduction,
        PagIbig_Deduction: computeResult.PagIbig_Deduction,
        Net_Pay: computeResult.Net_Pay,
      };
      const result = await finalizePayroll(dto);
      setFinalizeResult(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setFinalizeError(`Finalize failed: ${msg}`);
    } finally {
      setLoadingFinalize(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Payroll Integration Test
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tests the connection between web-hrms and api-hrms. Dev only.
          </p>
        </div>

        {/* Inputs */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Payroll Parameters
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Employee ID
              </label>
              <input
                type="number"
                min={1}
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Cutoff Date
              </label>
              <input
                type="date"
                value={cutoffDate}
                onChange={(e) => setCutoffDate(e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleCompute}
              disabled={loadingCompute}
              className="px-5 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingCompute ? "Computing…" : "Compute"}
            </button>
            <button
              onClick={handleFinalize}
              disabled={loadingFinalize || !computeResult}
              className="px-5 py-2 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingFinalize ? "Finalizing…" : "Finalize"}
            </button>
          </div>
        </div>

        {/* Compute Result */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Compute Response
          </h2>
          {computeError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {computeError}
            </div>
          )}
          <pre className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 text-green-400 text-xs p-4 overflow-x-auto min-h-[80px] whitespace-pre-wrap">
            {computeResult
              ? JSON.stringify(computeResult, null, 2)
              : "// Response will appear here after Compute"}
          </pre>
        </div>

        {/* Finalize Result */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Finalize Response
          </h2>
          {finalizeError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {finalizeError}
            </div>
          )}
          <pre className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 text-green-400 text-xs p-4 overflow-x-auto min-h-[80px] whitespace-pre-wrap">
            {finalizeResult
              ? JSON.stringify(finalizeResult, null, 2)
              : "// Response will appear here after Finalize"}
          </pre>
        </div>

      </div>
    </div>
  );
}
