import React from "react";
import { UserFormState } from "./types/user-management";

interface SystemAccessSectionProps {
  formData: UserFormState;
  onChange: (data: UserFormState) => void;
}

export default function SystemAccessSection({ formData, onChange }: SystemAccessSectionProps) {
  const handleToggle = (appName: "HRMS" | "POS" | "CRMS" | "SCRMS") => {
    const updatedAppAccesses = formData.appAccesses.map(app => 
      app.appName === appName 
        ? { ...app, enabled: !app.enabled }
        : app
    );
    onChange({ ...formData, appAccesses: updatedAppAccesses });
  };

  const systems = [
    { name: "HRMS", description: "Human Resource Management System" },
    { name: "POS", description: "Point of Sale System" },
    { name: "CRMS", description: "Customer Relationship Management" },
    { name: "SCRMS", description: "Supply Chain Management" }
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">System Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systems.map((system) => {
          const appAccess = formData.appAccesses.find(a => a.appName === system.name);
          return (
            <div key={system.name} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                id={`system-${system.name}`}
                checked={appAccess?.enabled || false}
                onChange={() => handleToggle(system.name)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="flex-1">
                <label 
                  htmlFor={`system-${system.name}`}
                  className="block text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {system.name}
                </label>
                <p className="text-xs text-gray-500 mt-1">{system.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
