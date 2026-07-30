import React, { useState } from 'react';
import { VersionSubTable } from './VersionTable';
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

export default function ProductTable({
  products,
  loading,
  onEditProduct,
  onDeleteProduct,
  onAddVersion,
  onEditVersion,
  onDeleteVersion,
}) {
  const [expandedRows, setExpandedRows] = useState({});
  const [visibleSecrets, setVisibleSecrets] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSecretVisibility = (id) => {
    setVisibleSecrets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
              <th className="py-4 px-4 w-12 text-center"></th>
              <th className="py-4 px-6 font-semibold">Product Name</th>
              <th className="py-4 px-6 font-semibold">API Key</th>
              <th className="py-4 px-6 font-semibold">API Secret</th>
              <th className="py-4 px-6 font-semibold text-center">Versions</th>
              <th className="py-4 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {loading && products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-slate-500">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-slate-500">
                  <FiPackage className="mx-auto text-4xl text-slate-300 mb-2" />
                  No products found. Click "New Product" to get started.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isExpanded = !!expandedRows[product.id];
                const showSecret = !!visibleSecrets[product.id];
                const versions = product.versions || [];

                return (
                  <React.Fragment key={product.id}>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => toggleRow(product.id)}
                          className="p-1 rounded text-slate-500 hover:text-amber-600 hover:bg-amber-50"
                        >
                          {isExpanded ? (
                            <FiChevronDown className="text-lg" />
                          ) : (
                            <FiChevronRight className="text-lg" />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div>{product.name}</div>
                        {product.description && (
                          <div className="text-xs text-slate-500 font-normal mt-0.5 line-clamp-1">
                            {product.description}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-700">
                        <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded inline-flex items-center gap-1">
                          <FiKey className="text-amber-600" />
                          {product.api_key}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded min-w-[120px]">
                            {showSecret
                              ? product.api_secret || 'N/A'
                              : '••••••••••••••••'}
                          </span>
                          {product.api_secret && (
                            <button
                              onClick={() => toggleSecretVisibility(product.id)}
                              className="text-slate-500 hover:text-slate-900 p-1"
                            >
                              {showSecret ? <FiEyeOff /> : <FiEye />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => toggleRow(product.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200"
                        >
                          <FiLayers className="text-amber-700" />
                          {versions.length}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => onEditProduct(product)}
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                          title="Edit Product"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600"
                          title="Delete Product"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="bg-slate-50/50">
                        <td colSpan="6" className="p-4 pl-14 pr-6">
                          <VersionSubTable
                            versions={versions}
                            product={product}
                            onAddVersion={onAddVersion}
                            onEditVersion={onEditVersion}
                            onDeleteVersion={onDeleteVersion}
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}