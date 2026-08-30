// Constants and helpers for the Add Employee wizard.

export const POSITIONS = [
  "Store Attendant", "Commissary Helper", "Bazaar Attendant",
  "Head Cook", "Assistant Cook", "Inventory Manager",
  "Supply Chain & Marketing Manager", "Logistics and Order Manager",
  "Admin", "Manager", "On call", "Merchandiser On Call", "OJT", "Intern/Summer Job",
];

export const WIZARD_STEPS = [
  "Core Profile & Personal Info",
  "Government Requirements",
  "Employment, Payroll & Property",
  "Health, Performance & Admin",
];

export interface AddEmployeeFormData {
  firstName: string; middleName: string; lastName: string;
  position: string; dateHired: string; dateOfBirth: string; contactNo: string; email: string; supervisor: string;
  emName: string; emPhone: string; emAddress: string; emRel: string;
  sss: string; philHealth: string; pagIbig: string; tin: string; nbiDate: string; brgyDate: string;
  bankDetails: string; uniform: boolean; companyId: boolean; companyIdNumber: string; equipment: string;
  checkedBy: string; checkedDate: string; remarks: string;
}

export interface AddEmployeeFileData {
  resumeFile: File | null;
  personalDataSheetFile: File | null;
  idPictureFile: File | null;
  birthCertificateFile: File | null;
  marriageCertificateFile: File | null;
  jobDescriptionFile: File | null;
  employmentContractFile: File | null;
  companyRulesFile: File | null;
  ndaFile: File | null;
  handbookFile: File | null;
  salaryAgreementFile: File | null;
  bir2316File: File | null;
  attendanceRecordFile: File | null;
  acknowledgmentReceiptFile: File | null;
  medicalCertificateFile: File | null;
  drugTestFile: File | null;
  vaccinationCardFile: File | null;
  performanceEvaluationFile: File | null;
  incidentReportFile: File | null;
  disciplinaryRecordFile: File | null;
  promotionRecordFile: File | null;
}

export const EMPTY_FORM_DATA: AddEmployeeFormData = {
  firstName: "", middleName: "", lastName: "",
  position: "", dateHired: "", dateOfBirth: "", contactNo: "", email: "", supervisor: "",
  emName: "", emPhone: "", emAddress: "", emRel: "",
  sss: "", philHealth: "", pagIbig: "", tin: "", nbiDate: "", brgyDate: "",
  bankDetails: "", uniform: false, companyId: false, companyIdNumber: "", equipment: "",
  checkedBy: "", checkedDate: "", remarks: "",
};

export const EMPTY_FILE_DATA: AddEmployeeFileData = {
  resumeFile: null, personalDataSheetFile: null, idPictureFile: null, birthCertificateFile: null, marriageCertificateFile: null,
  jobDescriptionFile: null, employmentContractFile: null, companyRulesFile: null, ndaFile: null, handbookFile: null,
  salaryAgreementFile: null, bir2316File: null, attendanceRecordFile: null, acknowledgmentReceiptFile: null,
  medicalCertificateFile: null, drugTestFile: null, vaccinationCardFile: null,
  performanceEvaluationFile: null, incidentReportFile: null, disciplinaryRecordFile: null, promotionRecordFile: null,
};

/** Map a file-state key to its backend multipart field name. */
const FILE_FIELD_MAP: Record<keyof AddEmployeeFileData, string> = {
  resumeFile: "ResumeFile",
  personalDataSheetFile: "PersonalDataSheetFile",
  idPictureFile: "IdPictureFile",
  birthCertificateFile: "BirthCertificateFile",
  marriageCertificateFile: "MarriageCertificateFile",
  jobDescriptionFile: "JobDescriptionFile",
  employmentContractFile: "EmploymentContractFile",
  companyRulesFile: "CompanyRulesFile",
  ndaFile: "NDAFile",
  handbookFile: "HandbookFile",
  salaryAgreementFile: "SalaryAgreementFile",
  bir2316File: "BIR2316File",
  attendanceRecordFile: "AttendanceRecordFile",
  acknowledgmentReceiptFile: "AcknowledgmentReceiptFile",
  medicalCertificateFile: "MedicalCertificateFile",
  drugTestFile: "DrugTestFile",
  vaccinationCardFile: "VaccinationCardFile",
  performanceEvaluationFile: "PerformanceEvaluationFile",
  incidentReportFile: "IncidentReportFile",
  disciplinaryRecordFile: "DisciplinaryRecordFile",
  promotionRecordFile: "PromotionRecordFile",
};

/**
 * Build the multipart FormData payload for creating a new employee 201 file.
 */
export function buildEmployeeFormData(
  formData: AddEmployeeFormData,
  fileData: AddEmployeeFileData
): FormData {
  const fd = new FormData();

  fd.append("FirstName", formData.firstName);
  fd.append("MiddleName", formData.middleName);
  fd.append("LastName", formData.lastName);
  fd.append("Position", formData.position);
  fd.append("DateHired", formData.dateHired);
  fd.append("DateOfBirth", formData.dateOfBirth);
  fd.append("ContactNo", formData.contactNo);
  fd.append("Email", formData.email);
  fd.append("Supervisor", formData.supervisor);
  fd.append("EmergencyContactName", formData.emName);
  fd.append("EmergencyContactPhone", formData.emPhone);
  fd.append("EmergencyContactRelationship", formData.emRel);

  fd.append("SSS", formData.sss);
  fd.append("PhilHealth", formData.philHealth);
  fd.append("PagIbig", formData.pagIbig);
  fd.append("TIN", formData.tin);
  fd.append("NBIExpirationDate", formData.nbiDate || "");
  fd.append("BarangayExpirationDate", formData.brgyDate || "");

  fd.append("BankDetails", formData.bankDetails);
  fd.append("UniformIssued", formData.uniform.toString());
  fd.append("CompanyIdIssued", formData.companyId.toString());
  fd.append("CompanyIdNumber", formData.companyIdNumber);
  fd.append("EquipmentIssued", formData.equipment);

  fd.append("CheckedBy", formData.checkedBy);
  fd.append("CheckedDate", formData.checkedDate || "");
  fd.append("Remarks", formData.remarks);

  (Object.keys(FILE_FIELD_MAP) as (keyof AddEmployeeFileData)[]).forEach((key) => {
    const file = fileData[key];
    if (file) fd.append(FILE_FIELD_MAP[key], file);
  });

  return fd;
}
