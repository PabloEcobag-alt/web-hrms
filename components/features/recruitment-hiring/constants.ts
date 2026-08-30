// Static option lists, checklist definitions, and initializers for
// the Recruitment & Hiring feature.

import type {
  ApplicantSource,
  HiringStage,
  GovernmentIds,
  HiringRequirements,
  EmploymentDocs,
  HealthDocs,
} from "./types";

export const POSITIONS = [
  "On Call",
  "Merchandiser Oncall",
  "Store Attendant",
  "Commissary Helper",
  "OJT",
  "Intern/Summer Job",
];

export const APPLICANT_SOURCES: ApplicantSource[] = [
  "Summer Job",
  "Walk-In",
  "Gmail Submission",
  "Website Portal",
];

export const HIRING_STAGES: HiringStage[] = [
  "Initial Interview",
  "Final Interview",
  "Job Offer",
  "Hired",
  "Probationary",
  "Failed",
];

export const GOVERNMENT_IDS = [
  { key: "sss", label: "SSS ID / Number" },
  { key: "philhealth", label: "PhilHealth ID / Number" },
  { key: "pagibig", label: "Pag-IBIG ID / Number" },
  { key: "tin", label: "TIN (BIR)" },
  { key: "umid", label: "UMID Card" },
  { key: "nationalId", label: "National ID" },
  { key: "passport", label: "Passport" },
  { key: "driverLicense", label: "Driver's License" },
  { key: "votersCert", label: "Voter's Certificate" },
];

export const HIRING_REQUIREMENTS = [
  { key: "nbi", label: "NBI Clearance" },
  { key: "medical", label: "Medical Certificate (Fit to Work)" },
  { key: "drugTest", label: "Drug Test Result" },
  { key: "xray", label: "Chest X-Ray" },
  { key: "psaBirthCert", label: "PSA Birth Certificate" },
  { key: "diploma", label: "Diploma / Transcript of Records" },
  { key: "signedNda", label: "Signed NDA" },
  { key: "contractSigned", label: "Employment Contract (Signed)" },
  { key: "resignationCert", label: "Certificate of Employment (prev.)" },
];

export const EMPLOYMENT_DOCUMENTS = [
  { key: "contractSigned", label: "Employment Contract (Signed)" },
  { key: "jobDescription", label: "Job Description" },
  { key: "rulesSigned", label: "Company Rules & Regulations (Signed)" },
  { key: "nda", label: "NDA / Confidentiality Agreement" },
  { key: "handbookAck", label: "Employee Handbook Acknowledgment" },
];

export const HEALTH_CHECKLIST = [
  { key: "medicalCertificate", label: "Medical Certificate" },
  { key: "drugTest", label: "Drug Test Result" },
  { key: "attendanceRecord", label: "Attendance Record / DTR" },
];

export const AVATAR_STYLES = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#F1EFE8", color: "#5F5E5A" },
  { bg: "#FAEEDA", color: "#854F0B" },
];

export function initGovIds(): GovernmentIds {
  return Object.fromEntries(GOVERNMENT_IDS.map((g) => [g.key, false]));
}
export function initRequirements(): HiringRequirements {
  return Object.fromEntries(HIRING_REQUIREMENTS.map((r) => [r.key, false]));
}
export function initEmploymentDocs(): EmploymentDocs {
  return Object.fromEntries(EMPLOYMENT_DOCUMENTS.map((d) => [d.key, false]));
}
export function initHealthDocs(): HealthDocs {
  return Object.fromEntries(HEALTH_CHECKLIST.map((h) => [h.key, false]));
}
