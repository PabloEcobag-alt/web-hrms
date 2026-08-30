// Constants and helpers for the Employee Edit modal.

export const EDIT_POSITIONS = [
  "Inventory Manager", "Supply Chain & Marketing Manager", "Assistant Cook",
  "Bazaar Attendant", "Store Attendant", "Logistics and Order Manager",
  "Head Cook", "Admin", "Manager", "On call", "Merchandiser On Call",
  "Commissary Helper", "OJT", "Intern/Summer Job",
];

export const EDIT_STATUSES = ["Regular", "Probationary", "Seasonal", "AWOL", "Resigned", "Terminated"];
export const EDIT_ROLES = ["Admin", "Cashier", "Manager", "Staff"];
export const EDIT_LOCATIONS = ["Marigman Main", "Antipolo Cathedral", "Commissary", "Bazaar"];
export const EDIT_SUPERVISORS = ["Sarah Jenkins", "Michael Torres"];

/**
 * Build the JSON payload (matching backend [FromBody]) for updating an
 * employee 201 file from the modal's editData state.
 */
export function buildEmployeeUpdatePayload(editData: any) {
  return {
    FirstName: editData.firstName || '',
    MiddleName: editData.middleName || '',
    LastName: editData.lastName || '',
    Email: editData.email || '',
    PhoneNumber: editData.phone || '',
    DateOfBirth: editData.dateOfBirth || '',
    Position: editData.position || '',
    Department: editData.department || '',
    Status: editData.status || '',
    Role: editData.role || '',
    DateHired: editData.dateHired || '',
    AssignedLocation: editData.location || '',
    Supervisor: editData.supervisor || '',
    EmergencyContactName: editData.emergencyContactName || '',
    EmergencyContactPhone: editData.emergencyContactPhone || '',
    EmergencyContactRelationship: editData.emergencyContactRelationship || '',
    SSS: editData.sss || '',
    PhilHealth: editData.philHealth || '',
    PagIbig: editData.hdmf || '',
    TIN: editData.tin || '',
    NbiClearanceDate: editData.nbiExpiration || '',
    BarangayClearanceDate: editData.barangayExpiration || '',
    BankDetails: editData.bankDetails || '',
    UniformIssued: editData.uniform || false,
    CompanyIdIssued: editData.companyId || false,
    CompanyIdNumber: editData.companyIdNumber || '',
    EquipmentIssued: editData.equipment || '',
    CheckedBy: editData.checkedBy || '',
    CheckedDate: editData.checkedDate || '',
    Remarks: editData.remarks || '',
  };
}

/**
 * Hydrate the modal editData shape from a full API employee profile response.
 */
export function editDataFromProfile(profile: any) {
  return {
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    position: profile.position || "",
    status: profile.status || "",
    role: profile.role || "",
    email: profile.email || "",
    phone: profile.phoneNumber || "",
    dateOfBirth: profile.dateOfBirth || "",
    location: profile.assignedLocation || "",
    supervisor: profile.supervisor || "",
    emergencyContactName: profile.emergencyContactName || "",
    emergencyContactPhone: profile.emergencyContactPhone || "",
    sss: profile.sss || "",
    philHealth: profile.philHealth || "",
    hdmf: profile.pagIbig || "",
    tin: profile.tin || "",
    nbiExpiration: profile.nbiClearanceDate || "",
    barangayExpiration: profile.barangayClearanceDate || "",
    companyIdNumber: profile.companyIdNumber || "",
  };
}
