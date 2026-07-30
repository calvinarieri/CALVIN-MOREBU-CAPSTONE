import React, { useState } from "react";
import { useStaff } from "../../context/StaffProvider";
import { StaffTable } from "../../components/staff/table/StaffTable";
import { StaffModalForm } from "../../components/staff/forms/StaffModalForm";
import { RolesTable } from "../../components/staff/table/RoleTable";
import { RoleModalForm } from "../../components/staff/forms/RoleModalForm";

export default function StaffPage() {
  const {
    staff,
    roles,
    loading,
    error,
    createStaff,
    updateStaff,
    deleteStaff,
    createRole,
    deleteRole,
  } = useStaff();

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleOpenCreateStaff = () => {
    setSelectedStaff(null);
    setIsStaffModalOpen(true);
  };

  const handleOpenEditStaff = (staffMember) => {
    setSelectedStaff(staffMember);
    setIsStaffModalOpen(true);
  };

  const handleSaveStaff = async (formData) => {
    if (selectedStaff) {
      await updateStaff(selectedStaff.id, formData, true);
    } else {
      await createStaff(formData);
    }
  };

  return (
    <div className="min-h-screen  space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Staff & Roles</h1>
          <p className="text-sm text-gray-500">
            Manage system permissions, user accounts, and roles.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-gray-700 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            + Add Role
          </button>
          <button
            onClick={handleOpenCreateStaff}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            + Add Staff Member
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Staff Directory</h2>
          <span className="text-xs font-semibold text-gray-500 uppercase">
            Total: {staff.length}
          </span>
        </div>
        <StaffTable
          staff={staff}
          onEdit={handleOpenEditStaff}
          onDelete={deleteStaff}
          loading={loading}
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">System Roles</h2>
          <span className="text-xs font-semibold text-gray-500 uppercase">
            Total: {roles.length}
          </span>
        </div>
        <RolesTable roles={roles} onDelete={deleteRole} />
      </div>

      <StaffModalForm
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onSubmit={handleSaveStaff}
        initialData={selectedStaff}
        roles={roles}
        loading={loading}
      />

      <RoleModalForm
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSubmit={createRole}
        loading={loading}
      />
    </div>
  );
}