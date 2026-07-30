import React, { useState } from 'react';
import {
  FiChevronDown,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiKey,
  FiLayers,
  FiPackage,
  FiPlus,
} from 'react-icons/fi';

export function VersionSubTable({
  versions,
  product,
  onAddVersion,
  onEditVersion,
  onDeleteVersion,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-inner">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <FiLayers className="text-amber-600" />
          Versions for {product.name}
        </h4>
        <button
          onClick={() => onAddVersion(null, product.id)}
          className="text-xs flex items-center gap-1 font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 px-3 py-1.5 rounded"
        >
          <FiPlus /> Add Version
        </button>
      </div>

      {versions.length === 0 ? (
        <p className="text-xs text-slate-500 py-2 italic">
          No version history registered for this product.
        </p>
      ) : (
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-semibold">
              <th className="py-2">Version</th>
              <th className="py-2">Description</th>
              <th className="py-2">Created Date</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {versions.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50">
                <td className="py-2.5 font-bold text-slate-900">
                  <span className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded font-mono">
                    {v.version}
                  </span>
                </td>
                <td className="py-2.5 text-slate-600">{v.description || '—'}</td>
                <td className="py-2.5 text-slate-500">
                  {v.created_at
                    ? new Date(v.created_at).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="py-2.5 text-right space-x-1">
                  <button
                    onClick={() => onEditVersion(v, product.id)}
                    className="p-1 text-slate-600 hover:text-slate-900"
                    title="Edit Version"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => onDeleteVersion(v.id)}
                    className="p-1 text-slate-400 hover:text-red-600"
                    title="Delete Version"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}