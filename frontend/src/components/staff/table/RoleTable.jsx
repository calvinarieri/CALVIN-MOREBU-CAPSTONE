import React, { useState } from "react";

export function RolesTable({ roles, onDelete }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-slate-50 text-xs uppercase font-semibold text-gray-500 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4">Role ID</th>
            <th className="px-6 py-4">Role Name</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {roles.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-6 text-center text-gray-400">
                No roles defined.
              </td>
            </tr>
          ) : (
            roles.map((role) => (
              <tr key={role.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-slate-400">{role.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{role.name}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDelete(role.id)}
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