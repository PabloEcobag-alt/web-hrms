// Static data & checklist definitions for the Digital 201 File feature.

import type { ChecklistItem, PendingHire } from "./types";

export const AVATAR_STYLES = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#F1EFE8", color: "#5F5E5A" },
  { bg: "#FAEEDA", color: "#854F0B" },
];

export const MOCK_PENDING_HIRES: PendingHire[] = [
  {
    id: "p1",
    firstName: "Alex",
    lastName: "Rivera",
    position: "Logistics and Order Manager",
    department: "Design",
    email: "alex.rivera@company.com",
    phone: "+1 555-0199",
    offerAcceptedDate: "2023-06-10",
  },
  {
    id: "p2",
    firstName: "Sam",
    lastName: "Lee",
    position: "Commissary Helper",
    department: "Engineering",
    email: "sam.lee@company.com",
    phone: "+1 555-0198",
    offerAcceptedDate: "2023-06-12",
  },
];

export const NEW_TABS: { key: string; label: string; items: ChecklistItem[] }[] = [
  {
    key: "personal",
    label: "Personal info",
    items: [
      { id: "resume", label: "Resume/CV" },
      { id: "pds", label: "Personal Data Sheet" },
      { id: "id_pic", label: "2x2 ID Picture" },
      { id: "valid_id", label: "Valid ID photocopy" },
      { id: "birth_cert", label: "Birth Certificate PSA" },
      { id: "marriage_cert", label: "Marriage Certificate", optional: true },
    ]
  },
  {
    key: "government",
    label: "Government IDs",
    items: [
      { id: "sss", label: "SSS" },
      { id: "philhealth", label: "PhilHealth" },
      { id: "pagibig", label: "Pag-IBIG" },
      { id: "tin", label: "TIN" },
      { id: "nbi", label: "NBI Clearance" },
      { id: "brgy", label: "Barangay Clearance" },
    ]
  },
  {
    key: "employment",
    label: "Employment docs",
    items: [
      { id: "contract", label: "Employment Contract" },
      { id: "jd", label: "Job Description" },
      { id: "rules", label: "Company Rules & Regulations" },
      { id: "nda", label: "NDA/Confidentiality Agreement" },
      { id: "handbook", label: "Employee Handbook Acknowledgment" },
    ]
  },
  {
    key: "payroll",
    label: "Payroll",
    items: [
      { id: "bank", label: "Payroll Account Details" },
      { id: "salary", label: "Salary Agreement" },
      { id: "bir2316", label: "BIR 2316", optional: true },
      { id: "dtr", label: "Attendance Record/DTR" },
    ]
  },
  {
    key: "health",
    label: "Health",
    items: [
      { id: "med_cert", label: "Medical Certificate Fit to Work" },
      { id: "drug_test", label: "Drug Test Result" },
      { id: "vax_card", label: "Vaccination Card" },
    ]
  },
  {
    key: "performance",
    label: "Performance",
    items: [
      { id: "perf_eval", label: "Performance Evaluation" },
      { id: "incident", label: "Incident Report", optional: true },
      { id: "disciplinary", label: "Disciplinary Record", optional: true },
      { id: "promotion", label: "Promotion/Salary Increase Record", optional: true },
    ]
  },
  {
    key: "company",
    label: "Company property",
    items: [
      { id: "uniform", label: "Uniform Issuance" },
      { id: "company_id", label: "Company ID" },
      { id: "equipment", label: "Equipment Issued" },
      { id: "ack_receipt", label: "Acknowledgment Receipt" },
    ]
  }
];

// Helper to provide a realistic static state for mock completion checks.
export const getMockCheckedItems = (empId: string) => {
  const initial: Record<string, boolean> = {};
  NEW_TABS.forEach((t) =>
    t.items.forEach((i) => {
      initial[i.id] =
        empId === "1"
          ? i.id !== "incident" && i.id !== "disciplinary" && i.id !== "promotion"
          : empId === "2"
            ? true
            : empId === "3"
              ? i.id.length % 2 === 0
              : i.id === "resume" || i.id === "pds" || i.id === "contract";
    }),
  );
  return initial;
};
