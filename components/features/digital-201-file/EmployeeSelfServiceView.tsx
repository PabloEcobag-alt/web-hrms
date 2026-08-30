"use client";

import type { EmployeeProfileDto } from "@/lib/services";
import type { Colors } from "./utils";

interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  emergencyContact: {
    firstName: string;
    lastName: string;
    relationship: string;
    phone: string;
    address: string;
  };
}

interface EmployeeSelfServiceViewProps {
  c: Colors;
  isLoadingEmployeeProfile: boolean;
  employeeProfileError: string | null;
  employeeProfile: EmployeeProfileDto | null;
  profilePictureUrl: string;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  setProfilePicture: (f: File | null) => void;
  setProfilePictureUrl: (url: string) => void;
  hasChanges: boolean;
  setHasChanges: (v: boolean) => void;
  isSaving: boolean;
  onSaveContactInfo: () => void;
}

/**
 * Employee self-service view: read-only HR profile data (left) and editable
 * contact information (right). Extracted from ViewDigital201File.
 */
export function EmployeeSelfServiceView({
  c,
  isLoadingEmployeeProfile,
  employeeProfileError,
  employeeProfile,
  profilePictureUrl,
  contactInfo,
  setContactInfo,
  setProfilePicture,
  setProfilePictureUrl,
  hasChanges,
  setHasChanges,
  isSaving,
  onSaveContactInfo,
}: EmployeeSelfServiceViewProps) {
  const fallback = (value?: string) =>
    value || (employeeProfileError ? "Not available" : "Loading...");

  return (
    <>
      {isLoadingEmployeeProfile && (
        <div className="flex items-center justify-center py-12" style={{ color: c.bodyText }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
          Loading employee profile...
        </div>
      )}

      {employeeProfileError && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center mb-6">
          <div className="text-amber-800 font-medium">{employeeProfileError}</div>
          <p className="text-sm text-amber-700 mt-2">
            Contact your HR administrator if you believe this is an error.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section 1: Read-Only HR Data */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>

          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-3">
              {profilePictureUrl ? (
                <img src={profilePictureUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
                  {employeeProfile ? `${employeeProfile.FirstName?.[0] || ''}${employeeProfile.LastName?.[0] || ''}` : 'JD'}
                </div>
              )}
              <label htmlFor="profile-picture-upload" className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full cursor-pointer transition-colors">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input
                id="profile-picture-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setProfilePicture(file);
                    setProfilePictureUrl(URL.createObjectURL(file));
                    setHasChanges(true);
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-500">Click to change photo</p>
          </div>

          <div className="space-y-4">
            {[
              { label: "First Name", value: employeeProfile?.FirstName },
              { label: "Last Name", value: employeeProfile?.LastName },
              { label: "Date of Birth", value: employeeProfile?.DateOfBirth },
              { label: "Position", value: employeeProfile?.Position },
              { label: "Status", value: employeeProfile?.Status },
              { label: "Location", value: employeeProfile?.AssignedLocation },
              { label: "Department", value: employeeProfile?.Department },
              { label: "Hire Date", value: employeeProfile?.DateHired },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-sm font-medium text-gray-500">{field.label}</label>
                <p className="text-gray-900 font-medium">{fallback(field.value)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Editable Contact Data */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => { setContactInfo(prev => ({ ...prev, email: e.target.value })); setHasChanges(true); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => { setContactInfo(prev => ({ ...prev, phone: e.target.value })); setHasChanges(true); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {([
                  { key: "firstName", label: "First Name", type: "text", span: false },
                  { key: "lastName", label: "Last Name", type: "text", span: false },
                  { key: "relationship", label: "Relationship", type: "text", span: false },
                  { key: "phone", label: "Phone Number", type: "tel", span: false },
                  { key: "address", label: "Address", type: "text", span: true },
                ] as const).map((field) => (
                  <div key={field.key} className={field.span ? "md:col-span-2" : ""}>
                    <label className="text-xs text-gray-500">{field.label}</label>
                    <input
                      type={field.type}
                      value={contactInfo.emergencyContact[field.key]}
                      onChange={(e) => {
                        setContactInfo(prev => ({
                          ...prev,
                          emergencyContact: { ...prev.emergencyContact, [field.key]: e.target.value },
                        }));
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {hasChanges && (
            <div className="flex justify-end mt-6">
              <button
                onClick={onSaveContactInfo}
                disabled={isSaving}
                className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground rounded-lg transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
