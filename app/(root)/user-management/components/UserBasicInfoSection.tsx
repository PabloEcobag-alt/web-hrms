import React from "react";
import { AppSelect } from "@/components/ui/app-select";
import { UserFormState } from "./types/user-management";

interface UserBasicInfoSectionProps {
  formData: UserFormState;
  onChange: (data: UserFormState) => void;
}

export default function UserBasicInfoSection({ formData, onChange }: UserBasicInfoSectionProps) {
  const handleChange = (field: keyof UserFormState, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <AppSelect
            value={formData.role}
            onValueChange={(v) => handleChange("role", v)}
            placeholder="Select a role"
            className="w-full"
            options={[
              { value: "", label: "Select a role" },
              { value: "Admin", label: "Admin" },
              { value: "HR", label: "HR" },
              { value: "HRAdmin", label: "HR Admin" },
              { value: "Manager", label: "Manager" },
              { value: "SystemAdmin", label: "System Admin" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
