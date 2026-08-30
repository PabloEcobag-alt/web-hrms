import React from "react";
import { AppSelect } from "@/components/ui/app-select";
import { UserFormState, MOCK_LOCATIONS } from "./types/user-management";

interface POSAccessFormProps {
  formData: UserFormState;
  onChange: (data: UserFormState) => void;
}

export default function POSAccessForm({ formData, onChange }: POSAccessFormProps) {
  const posApp = formData.appAccesses.find(a => a.appName === "POS");

  const handleSubRoleChange = (subRole: "Cashier" | "Manager" | undefined) => {
    const updatedAppAccesses = formData.appAccesses.map(app => 
      app.appName === "POS" 
        ? { ...app, subRole }
        : app
    );
    onChange({ ...formData, appAccesses: updatedAppAccesses });
  };

  const handleLocationChange = (locationId: number | undefined) => {
    const updatedAppAccesses = formData.appAccesses.map(app => 
      app.appName === "POS" 
        ? { ...app, locationId }
        : app
    );
    onChange({ ...formData, appAccesses: updatedAppAccesses });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">POS Access Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub-Role
          </label>
          <AppSelect
            value={posApp?.subRole || ""}
            onValueChange={(v) => handleSubRoleChange(v ? (v as "Cashier" | "Manager") : undefined)}
            placeholder="Select a sub-role"
            className="w-full"
            options={[
              { value: "", label: "Select a sub-role" },
              { value: "Cashier", label: "Cashier" },
              { value: "Manager", label: "Manager" },
            ]}
          />
          <p className="text-xs text-gray-500 mt-1">Select the user's role within the POS system</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <AppSelect
            value={posApp?.locationId?.toString() || ""}
            onValueChange={(v) => handleLocationChange(v ? parseInt(v) : undefined)}
            placeholder="Select a location"
            className="w-full"
            options={[
              { value: "", label: "Select a location" },
              ...MOCK_LOCATIONS.map((location) => ({
                value: location.id.toString(),
                label: location.name,
              })),
            ]}
          />
          <p className="text-xs text-gray-500 mt-1">Assign the user to a specific branch/location</p>
        </div>
      </div>
    </div>
  );
}
