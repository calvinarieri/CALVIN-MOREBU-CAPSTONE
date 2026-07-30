import React from "react";

export function StaffTable({ staff, onEdit, onDelete, loading }) {
    console.log(staff)
  if (loading && staff.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Loading staff members...
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-slate-50 text-xs uppercase font-semibold text-gray-500 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created At</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {staff.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                No staff members found.
              </td>
            </tr>
          ) : (
            staff.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {member.first_name || member.last_name
                    ? `${member.first_name} ${member.last_name}`.trim()
                    : "—"}
                </td>
                <td className="px-6 py-4 text-gray-600">{member.email}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                    {member.role ? member.role.name || member.role : "No Role"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.is_active
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {member.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(member.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(member)}
                    className="text-slate-600 hover:text-amber-600 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(member.id)}
                    className="text-rose-600 hover:text-rose-800 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}