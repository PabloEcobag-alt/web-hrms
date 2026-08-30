"use client";

import { useState } from "react";
import { TopCandidate } from "@/lib/types/analytics";
import { exportAllCandidates } from "@/lib/services/analyticsService";

interface CSVExportButtonProps {
  startDate?: string;
  endDate?: string;
}

export function CSVExportButton({ startDate, endDate }: CSVExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await exportAllCandidates(startDate, endDate);
      
      if (!data || data.length === 0) {
        alert("No data to export");
        return;
      }

      const headers = ["Applicant ID", "First Name", "Last Name", "Email", "Phone Number", "Position", "Match Score", "Screening Result", "Model Version", "Created At"];
      const csvContent = [
        headers.join(","),
        ...data.map(row => [
          row.applicantId,
          `"${row.firstName}"`,
          `"${row.lastName}"`,
          `"${row.email}"`,
          `'${row.phoneNumber}`,
          `"${row.position}"`,
          row.matchScore,
          `"${row.screeningResult}"`,
          `"${row.modelVersion}"`,
          `"${row.createdAt}"`
        ].join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `top_candidates_${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to export CSV:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
    >
      {isExporting ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Exporting...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </>
      )}
    </button>
  );
}
