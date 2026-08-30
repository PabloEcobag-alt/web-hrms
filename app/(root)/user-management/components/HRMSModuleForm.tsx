import React from "react";
import { UserFormState, ModuleAccessState } from "./types/user-management";

interface HRMSModuleFormProps {
  formData: UserFormState;
  onChange: (data: UserFormState) => void;
}

export default function HRMSModuleForm({ formData, onChange }: HRMSModuleFormProps) {
  const hrmsApp = formData.appAccesses.find(a => a.appName === "HRMS");
  
  const handleModulePermissionChange = (
    moduleName: "EmployeePortal" | "Payroll" | "Attendance",
    permission: keyof ModuleAccessState["permissions"],
    value: boolean
  ) => {
    const updatedAppAccesses = formData.appAccesses.map(app => {
      if (app.appName === "HRMS") {
        const updatedModules = app.modules?.map(module => {
          if (module.moduleName === moduleName) {
            return {
              ...module,
              permissions: { ...module.permissions, [permission]: value }
            };
          }
          return module;
        }) || [];
        
        // Initialize module if it doesn't exist
        if (!updatedModules.find(m => m.moduleName === moduleName)) {
          updatedModules.push({
            moduleName,
            permissions: {
              canRead: permission === "canRead" ? value : false,
              canWrite: permission === "canWrite" ? value : false,
              canDelete: permission === "canDelete" ? value : false,
              canExport: permission === "canExport" ? value : false
            }
          });
        }
        
        return { ...app, modules: updatedModules };
      }
      return app;
    });
    
    onChange({ ...formData, appAccesses: updatedAppAccesses });
  };

  const modules = [
    { name: "EmployeePortal", label: "Employee Portal" },
    { name: "Payroll", label: "Payroll" },
    { name: "Attendance", label: "Attendance" }
  ] as const;

  const getModulePermissions = (moduleName: string) => {
    return hrmsApp?.modules?.find(m => m.moduleName === moduleName)?.permissions || {
      canRead: false,
      canWrite: false,
      canDelete: false,
      canExport: false
    };
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">HRMS Module Permissions</h2>
      <div className="space-y-4">
        {modules.map((module) => {
          const permissions = getModulePermissions(module.name);
          return (
            <div key={module.name} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">{module.label}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: "canRead" as const, label: "Read" },
                  { key: "canWrite" as const, label: "Write" },
                  { key: "canDelete" as const, label: "Delete" },
                  { key: "canExport" as const, label: "Export" }
                ].map((perm) => (
                  <label key={perm.key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions[perm.key]}
                      onChange={(e) => handleModulePermissionChange(module.name, perm.key, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
