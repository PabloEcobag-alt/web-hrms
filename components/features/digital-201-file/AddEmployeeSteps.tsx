"use client";

import type { Employee } from "./types";
import type { Colors } from "./utils";
import { AppSelect } from "@/components/ui/app-select";
import { TextInput, SelectInput, FileUploadField, GovDocRow } from "./formFields";
import { POSITIONS, type AddEmployeeFormData } from "./addEmployeeConstants";

type Errors = Record<string, boolean>;
type OnInput = (field: string, val: string | boolean) => void;

interface StepProps {
  c: Colors;
  formData: AddEmployeeFormData;
  errors: Errors;
  onInput: OnInput;
}

/** Step 1: Core profile, emergency contact, initial documents. */
export function AddEmployeeStep1({ c, formData, errors, onInput, adminEmployees }: StepProps & { adminEmployees: Employee[] }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: c.mutedText }}>Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextInput label="First Name" required value={formData.firstName} onChange={(e: any) => onInput("firstName", e.target.value)} error={errors.firstName} c={c} />
          <TextInput label="Middle Name" value={formData.middleName} onChange={(e: any) => onInput("middleName", e.target.value)} c={c} />
          <TextInput label="Last Name" required value={formData.lastName} onChange={(e: any) => onInput("lastName", e.target.value)} error={errors.lastName} c={c} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput label="Position" required value={formData.position} onChange={(e: any) => onInput("position", e.target.value)} error={errors.position} options={POSITIONS} c={c} />
        <TextInput type="date" label="Date Hired" required value={formData.dateHired} onChange={(e: any) => onInput("dateHired", e.target.value)} error={errors.dateHired} c={c} />
        <TextInput label="Contact No." required value={formData.contactNo} onChange={(e: any) => onInput("contactNo", e.target.value)} error={errors.contactNo} c={c} />
        <TextInput type="email" label="Email Add." required value={formData.email} onChange={(e: any) => onInput("email", e.target.value)} error={errors.email} c={c} />
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Supervisor</label>
          <AppSelect
            value={formData.supervisor}
            onValueChange={(v) => onInput("supervisor", v)}
            placeholder="None"
            options={[
              { value: "", label: "None" },
              ...adminEmployees
                .filter(e =>
                  e.department === 'HR' ||
                  e.position.toLowerCase().includes('manager') ||
                  e.position.toLowerCase().includes('admin') ||
                  e.position.toLowerCase().includes('supervisor')
                )
                .map((emp) => ({ value: emp.name, label: emp.name })),
            ]}
            className="w-full"
            triggerClassName="px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-t pt-6" style={{ color: c.mutedText, borderColor: c.cardBorder }}>Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Name" value={formData.emName} onChange={(e: any) => onInput("emName", e.target.value)} c={c} />
          <TextInput label="Phone Number" value={formData.emPhone} onChange={(e: any) => onInput("emPhone", e.target.value)} c={c} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TextInput label="Address" value={formData.emAddress} onChange={(e: any) => onInput("emAddress", e.target.value)} c={c} />
          <TextInput label="Relationship" value={formData.emRel} onChange={(e: any) => onInput("emRel", e.target.value)} c={c} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-t pt-6" style={{ color: c.mutedText, borderColor: c.cardBorder }}>Initial Documents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FileUploadField label="Resume/CV" c={c} />
          <FileUploadField label="Personal Data Sheet" c={c} />
          <FileUploadField label="2x2 ID Picture" c={c} />
          <FileUploadField label="Birth Certificate (PSA)" c={c} />
          <FileUploadField label="Marriage Certificate" optional c={c} />
        </div>
      </div>
    </div>
  );
}

/** Step 2: Government requirements. */
export function AddEmployeeStep2({ c, formData, onInput }: StepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: c.mutedText }}>Government Requirements</h3>
      <div className="grid grid-cols-1 gap-6">
        <GovDocRow title="SSS" inputLabel="Number Input" placeholder="Enter card number" value={formData.sss} onChange={(val: string) => onInput("sss", val)} type="text" c={c} />
        <GovDocRow title="PhilHealth" inputLabel="Number Input" placeholder="Enter card number" value={formData.philHealth} onChange={(val: string) => onInput("philHealth", val)} type="text" c={c} />
        <GovDocRow title="Pag-IBIG Number" inputLabel="Number Input" placeholder="Enter card number" value={formData.pagIbig} onChange={(val: string) => onInput("pagIbig", val)} type="text" c={c} />
        <GovDocRow title="TIN (BIR)" inputLabel="Number Input" placeholder="Enter card number" value={formData.tin} onChange={(val: string) => onInput("tin", val)} type="text" c={c} />
        <GovDocRow title="NBI Clearance" inputLabel="Enter expiration date" placeholder="Enter expiration date" value={formData.nbiDate} onChange={(val: string) => onInput("nbiDate", val)} type="date" c={c} />
        <GovDocRow title="Barangay Clearance" inputLabel="Enter expiration date" placeholder="Enter expiration date" value={formData.brgyDate} onChange={(val: string) => onInput("brgyDate", val)} type="date" c={c} />
      </div>
    </div>
  );
}

/** Step 3: Employment, payroll and property. */
export function AddEmployeeStep3({ c, formData, onInput }: StepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: c.mutedText }}>Employment Documents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FileUploadField label="Job Description" c={c} />
          <FileUploadField label="Employment Contract (Signed)" c={c} />
          <FileUploadField label="Company Rules & Regs (Signed)" c={c} />
          <FileUploadField label="NDA / Confidentiality" c={c} />
          <FileUploadField label="Handbook Acknowledgment" c={c} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-t pt-6" style={{ color: c.mutedText, borderColor: c.cardBorder }}>Payroll & Compensation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput label="Payroll Account Details" value={formData.bankDetails} onChange={(e: any) => onInput("bankDetails", e.target.value)} c={c} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FileUploadField label="Salary Agreement" c={c} />
          <FileUploadField label="BIR 2316" c={c} />
          <FileUploadField label="Attendance Record / DTR" c={c} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-t pt-6" style={{ color: c.mutedText, borderColor: c.cardBorder }}>Company Property Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border bg-white" style={{ borderColor: c.cardBorder, color: c.bodyText }}>
              <input type="checkbox" checked={formData.uniform} onChange={e => onInput("uniform", e.target.checked)} className="w-5 h-5 text-primary rounded border-gray-300" />
              <span className="text-sm font-semibold">Uniform Issuance</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border bg-white" style={{ borderColor: c.cardBorder, color: c.bodyText }}>
              <input type="checkbox" checked={formData.companyId} onChange={e => onInput("companyId", e.target.checked)} className="w-5 h-5 text-primary rounded border-gray-300" />
              <span className="text-sm font-semibold">Company ID Issued</span>
            </label>
            {formData.companyId && (
              <div className="mt-2">
                <TextInput label="Company ID Number" value={formData.companyIdNumber} onChange={(e: any) => onInput("companyIdNumber", e.target.value)} placeholder="Enter ID number" c={c} />
              </div>
            )}
          </div>
          <TextInput isTextArea label="Equipment Issued (Specify items)" value={formData.equipment} onChange={(e: any) => onInput("equipment", e.target.value)} c={c} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FileUploadField label="Acknowledgment Receipt" c={c} />
        </div>
      </div>
    </div>
  );
}

/** Step 4: Health, performance and admin sign-off. */
export function AddEmployeeStep4({ c, formData, onInput }: StepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: c.mutedText }}>Health & Medical</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FileUploadField label="Medical Cert (Fit to Work)" c={c} />
          <FileUploadField label="Drug Test Result" c={c} />
          <FileUploadField label="Vaccination Card" c={c} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-t pt-6" style={{ color: c.mutedText, borderColor: c.cardBorder }}>Performance & Records</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FileUploadField label="Performance Evaluation" c={c} />
          <FileUploadField label="Incident Report" c={c} />
          <FileUploadField label="Disciplinary Record" c={c} />
          <FileUploadField label="Promotion / Salary Increase Record" c={c} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-t pt-6" style={{ color: c.mutedText, borderColor: c.cardBorder }}>Admin Sign-Off</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput label="Checked By" value={formData.checkedBy} onChange={(e: any) => onInput("checkedBy", e.target.value)} c={c} />
          <TextInput type="date" label="Date" value={formData.checkedDate} onChange={(e: any) => onInput("checkedDate", e.target.value)} c={c} />
        </div>
        <TextInput isTextArea label="Notes / Remarks" value={formData.remarks} onChange={(e: any) => onInput("remarks", e.target.value)} c={c} />
      </div>
    </div>
  );
}
