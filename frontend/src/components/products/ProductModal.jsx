import React from 'react';
import { FiX, FiPackage, FiLayers } from 'react-icons/fi';
import ProductForm from './forms/ProductForm';
import VersionForm from './forms/VersionForm';

export function ProductModal({ isOpen, onClose, editingProduct, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
        <div className="px-6 py-4 flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {editingProduct ? 'Edit Product' : 'Create Product'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <FiX className="text-xl" />
          </button>
        </div>
        <ProductForm
          initialValues={editingProduct}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export function VersionModal({
  isOpen,
  onClose,
  editingVersion,
  products,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <FiLayers className="text-amber-400" />
            {editingVersion?.id ? 'Edit Version' : 'Add Product Version'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <FiX className="text-xl" />
          </button>
        </div>
        <VersionForm
          initialValues={editingVersion}
          products={products}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}