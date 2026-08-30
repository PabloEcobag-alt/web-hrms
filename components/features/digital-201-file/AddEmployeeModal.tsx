"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import api from "@/lib/api";
import type { Employee, PendingHire } from "./types";
import { useColors } from "./utils";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  WIZARD_STEPS,
  EMPTY_FORM_DATA,
  EMPTY_FILE_DATA,
  buildEmployeeFormData,
  type AddEmployeeFormData,
  type AddEmployeeFileData,
} from "./addEmployeeConstants";
import {
  AddEmployeeStep1,
  AddEmployeeStep2,
  AddEmployeeStep3,
  AddEmployeeStep4,
} from "./AddEmployeeSteps";

export function AddEmployeeModal({ isOpen, onClose, c, isDark, initialData = null, onEmployeeCreated, adminEmployees }: { isOpen: boolean, onClose: () => void, c: ReturnType<typeof useColors>, isDark: boolean, initialData?: PendingHire | null, onEmployeeCreated?: () => void, adminEmployees: Employee[] }) {
  const [step, setStep] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<AddEmployeeFormData>(EMPTY_FORM_DATA);
  const [fileData, setFileData] = useState<AddEmployeeFileData>(EMPTY_FILE_DATA);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [duplicateError, setDuplicateError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      setStep(1);
      let firstName = "", lastName = "";
      if (initialData?.name) {
        const nameParts = initialData.name.split(' ');
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(' ') || "";
      }

      setFormData({
        ...EMPTY_FORM_DATA,
        firstName: initialData?.firstName || firstName,
        lastName: initialData?.lastName || lastName,
        position: initialData?.position || "",
        contactNo: initialData?.phone || "",
        email: initialData?.email || "",
      });
      setErrors({});
      setDuplicateError(false);
      setFileData(EMPTY_FILE_DATA);
    }
  }, [isOpen, initialData]);

  if (!isOpen || !mounted) return null;

  const handleNext = async () => {
    if (step === 1) {
      const newErrors: Record<string, boolean> = {};
      if (!formData.firstName) newErrors.firstName = true;
      if (!formData.lastName) newErrors.lastName = true;
      if (!formData.position) newErrors.position = true;
      if (!formData.dateHired) newErrors.dateHired = true;
      if (!formData.contactNo) newErrors.contactNo = true;
      if (!formData.email) newErrors.email = true;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        const response = await api.get(`/api/admin/digital201/employees/check-duplicate?firstName=${encodeURIComponent(formData.firstName)}&lastName=${encodeURIComponent(formData.lastName)}`);
        if (response.data) {
          setErrors({ lastName: true });
          alert('An employee with this name already exists. Please use a different name.');
          return;
        }
      } catch (error) {
        console.error('Error checking duplicate employee:', error);
      }
    }
    setErrors({});
    setStep(s => Math.min(4, s + 1));
  };

  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleSave = async () => {
    try {
      const formDataToSend = buildEmployeeFormData(formData, fileData);
      await api.post('/api/admin/digital201/employees', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Employee added successfully!');
      onClose();

      setFormData(EMPTY_FORM_DATA);
      setDuplicateError(false);
      setFileData(EMPTY_FILE_DATA);

      if (onEmployeeCreated) onEmployeeCreated();
    } catch (error: any) {
      console.error('Error creating employee:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add employee';
      toast.error(errorMessage);
    }
  };

  const handleInput = (field: string, val: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const isFormDirty = () => {
    const hasFormData = Object.values(formData).some(value => {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') return value.trim() !== '';
      return false;
    });
    const hasFiles = Object.values(fileData).some(file => file !== null);
    return hasFormData || hasFiles;
  };

  const handleModalClose = () => {
    if (isFormDirty()) {
      const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to discard them and close?");
      if (confirmClose) {
        setFormData(EMPTY_FORM_DATA);
        setFileData(EMPTY_FILE_DATA);
        setErrors({});
        onClose();
      }
    } else {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center isolation-auto p-4 md:p-6" style={{ backdropFilter: "blur(4px)" }} onClick={handleModalClose}>
      <div className="rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl bg-white" style={{ border: `1px solid ${c.cardBorder}` }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50" style={{ borderColor: c.cardBorder }}>
          <div>
            <h2 className="text-xl font-bold m-0" style={{ color: c.headingText }}>Add New Employee</h2>
            <p className="text-xs text-gray-500 mt-1">Step {step} of 4: {WIZARD_STEPS[step - 1]}</p>
          </div>
          <button onClick={handleModalClose} className="p-2 rounded-xl hover:bg-gray-200 transition-colors focus:outline-none text-gray-500">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="max-w-3xl mx-auto space-y-8 pb-10">
            {step === 1 && <AddEmployeeStep1 c={c} formData={formData} errors={errors} onInput={handleInput} adminEmployees={adminEmployees} />}
            {step === 2 && <AddEmployeeStep2 c={c} formData={formData} errors={errors} onInput={handleInput} />}
            {step === 3 && <AddEmployeeStep3 c={c} formData={formData} errors={errors} onInput={handleInput} />}
            {step === 4 && <AddEmployeeStep4 c={c} formData={formData} errors={errors} onInput={handleInput} />}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-between items-center bg-gray-50" style={{ borderColor: c.cardBorder }}>
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: c.mutedText, border: `1px solid ${c.cardBorder}` }}
          >
            Back
          </button>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`w-2.5 h-2.5 rounded-full transition-colors ${s === step ? 'bg-primary' : 'bg-gray-300'}`} />
            ))}
          </div>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={duplicateError}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-xs ${
                duplicateError
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={() => setConfirmOpen(true)}
              className="px-5 py-2.5 rounded-lg text-sm font-bold bg-black text-white hover:bg-black/90 transition-colors shadow-xs"
            >
              {initialData ? "Activate & Create 201 File" : "Save Employee"}
            </button>
          )}
        </div>

      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={initialData ? "Create 201 file?" : "Add this employee?"}
        description={
          initialData
            ? "This will activate the hire and create their 201 file."
            : "This will create a new employee 201 file record."
        }
        confirmLabel={initialData ? "Activate & Create" : "Save Employee"}
        cancelLabel="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); void handleSave(); }}
      />
    </div>,
    document.body
  );
}
