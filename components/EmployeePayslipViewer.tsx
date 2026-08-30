"use client";

import React, { useState } from "react";

type Colors = {
  cardBg: string;
  cardBorder: string;
  rowDivider: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  colHeader: string;
  highSalary: string;
  mediumSalary: string;
  lowSalary: string;
  deduction: string;
  allowance: string;
};

interface EmployeePayslipViewerProps {
  c: Colors;
  isDark: boolean;
}

interface Payslip {
  id: string;
  cutoffDate: string;
  period: string;
  basic: number;
  ot: number;
  allowances: number;
  grossPay: number;
  sss: number;
  philHealth: number;
  pagIbig: number;
  tax: number;
  totalDeductions: number;
  netPay: number;
}

const MOCK_PAYSLIPS: Payslip[] = [
  {
    id: "1",
    cutoffDate: "2026-04-25",
    period: "11th - 25th April 2026",
    basic: 25000,
    ot: 1500,
    allowances: 2000,
    grossPay: 28500,
    sss: 1350,
    philHealth: 437.50,
    pagIbig: 200,
    tax: 2000,
    totalDeductions: 3987.50,
    netPay: 24512.50,
  },
  {
    id: "2",
    cutoffDate: "2026-04-10",
    period: "26th March - 10th April 2026",
    basic: 25000,
    ot: 800,
    allowances: 2000,
    grossPay: 27800,
    sss: 1350,
    philHealth: 437.50,
    pagIbig: 200,
    tax: 1950,
    totalDeductions: 3937.50,
    netPay: 23862.50,
  },
  {
    id: "3",
    cutoffDate: "2026-03-25",
    period: "11th - 25th March 2026",
    basic: 25000,
    ot: 0,
    allowances: 2000,
    grossPay: 27000,
    sss: 1350,
    philHealth: 437.50,
    pagIbig: 200,
    tax: 1900,
    totalDeductions: 3887.50,
    netPay: 23112.50,
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export default function EmployeePayslipViewer({ c, isDark }: EmployeePayslipViewerProps) {
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleDownloadPDF = () => {
    console.log("Download PDF for payslip:", selectedPayslip?.id);
    setToastMessage("Payslip PDF downloaded successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSendEmail = () => {
    console.log("Send payslip to email for:", selectedPayslip?.id);
    setToastMessage("Payslip sent to your email!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Payslip List */}
      <div className="rounded-xl border overflow-hidden" style={{ background: c.cardBg, borderColor: c.cardBorder }}>
        <div className="p-3 md:p-5 border-b" style={{ borderColor: c.cardBorder }}>
          <h2 className="text-base md:text-lg font-semibold m-0" style={{ color: c.headingText }}>My Payslips</h2>
          <p className="text-xs md:text-sm mt-1" style={{ color: c.mutedText }}>
            View your payslip history by cut-off date
          </p>
        </div>
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${c.cardBorder}` }}>
                {["CUTOFF DATE", "PERIOD", "GROSS PAY", "DEDUCTIONS", "NET PAY", "ACTION"].map((col) => (
                  <th key={col} style={{
                    padding: "10px 12px",
                    textAlign: "left",
                    fontSize: 10,
                    fontWeight: 700,
                    color: c.colHeader,
                    letterSpacing: "0.07em",
                    whiteSpace: "nowrap",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_PAYSLIPS.map((payslip, idx) => (
                <tr key={payslip.id} style={{
                  borderBottom: idx < MOCK_PAYSLIPS.length - 1 ? `1px solid ${c.rowDivider}` : "none",
                  background: c.cardBg,
                }}>
                  <td style={{ padding: "12px", color: c.bodyText, fontSize: 11 }}>{payslip.cutoffDate}</td>
                  <td style={{ padding: "12px", color: c.mutedText, fontSize: 11 }}>{payslip.period}</td>
                  <td style={{ padding: "12px", color: c.allowance, fontSize: 11 }}>{formatCurrency(payslip.grossPay)}</td>
                  <td style={{ padding: "12px", color: c.deduction, fontSize: 11 }}>{formatCurrency(payslip.totalDeductions)}</td>
                  <td style={{ padding: "12px", fontWeight: 700, color: c.highSalary, fontSize: 11 }}>
                    {formatCurrency(payslip.netPay)}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => setSelectedPayslip(payslip)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Payslip Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="rounded-xl w-full max-w-2xl p-4 md:p-6 max-h-[85vh] overflow-y-auto mx-auto transform -translate-y-1/2 relative z-[101]" style={{ background: c.cardBg, border: `1px solid ${c.cardBorder}` }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: c.headingText }}>Payslip Details</h2>
                <p className="text-xs mt-1" style={{ color: c.mutedText }}>
                  John Smith (EMP-001) — {selectedPayslip.period}
                </p>
              </div>
              <button onClick={() => setSelectedPayslip(null)} className="p-1 rounded-lg" style={{ color: c.bodyText }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Earnings Section */}
            <div className="mb-4 p-3 rounded-lg" style={{ background: isDark ? "#1d2939" : "#f9fafb", border: `1px solid ${c.cardBorder}` }}>
              <h3 className="text-xs font-bold mb-2" style={{ color: c.headingText, letterSpacing: "0.07em" }}>EARNINGS</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: c.bodyText }}>Basic Salary</span>
                  <span className="text-xs font-semibold" style={{ color: c.bodyText }}>{formatCurrency(selectedPayslip.basic)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: c.bodyText }}>Overtime Pay</span>
                  <span className="text-xs font-semibold" style={{ color: c.allowance }}>{formatCurrency(selectedPayslip.ot)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: c.bodyText }}>Allowances</span>
                  <span className="text-xs font-semibold" style={{ color: c.allowance }}>{formatCurrency(selectedPayslip.allowances)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: c.rowDivider }}>
                  <span className="text-xs font-bold" style={{ color: c.headingText }}>Gross Pay</span>
                  <span className="text-sm font-bold" style={{ color: c.highSalary }}>{formatCurrency(selectedPayslip.grossPay)}</span>
                </div>
              </div>
            </div>

            {/* Deductions Section */}
            <div className="mb-4 p-3 rounded-lg" style={{ background: isDark ? "#1d2939" : "#f9fafb", border: `1px solid ${c.cardBorder}` }}>
              <h3 className="text-xs font-bold mb-2" style={{ color: c.headingText, letterSpacing: "0.07em" }}>DEDUCTIONS</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: c.bodyText }}>SSS</span>
                  <span className="text-xs font-semibold" style={{ color: c.deduction }}>{formatCurrency(selectedPayslip.sss)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: c.bodyText }}>PhilHealth</span>
                  <span className="text-xs font-semibold" style={{ color: c.deduction }}>{formatCurrency(selectedPayslip.philHealth)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: c.bodyText }}>Pag-IBIG</span>
                  <span className="text-xs font-semibold" style={{ color: c.deduction }}>{formatCurrency(selectedPayslip.pagIbig)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: c.bodyText }}>Withholding Tax</span>
                  <span className="text-xs font-semibold" style={{ color: c.deduction }}>{formatCurrency(selectedPayslip.tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: c.rowDivider }}>
                  <span className="text-xs font-bold" style={{ color: c.headingText }}>Total Deductions</span>
                  <span className="text-sm font-bold" style={{ color: c.deduction }}>{formatCurrency(selectedPayslip.totalDeductions)}</span>
                </div>
              </div>
            </div>

            {/* Net Pay Summary */}
            <div className="mb-4 p-4 rounded-lg" style={{ background: c.highSalary + "15", border: `1px solid ${c.highSalary}` }}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold" style={{ color: c.headingText }}>NET PAY</span>
                <span className="text-xl font-bold" style={{ color: c.highSalary }}>{formatCurrency(selectedPayslip.netPay)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
              <button
                onClick={handleSendEmail}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send to Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg z-[102]" style={{ background: c.highSalary, color: "#ffffff" }}>
          <p className="text-xs font-medium m-0">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
