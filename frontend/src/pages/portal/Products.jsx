import React, { useContext, useState } from 'react';
import { FiPlus, FiLayers } from 'react-icons/fi';
import { ProductContext } from '../../context/ProductsProvider';
import ProductTable from '../../components/products/table/ProductTable';
import { ProductModal, VersionModal } from '../../components/products/ProductModal';

export default function Products() {
  const {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    addProductVersion,
    editProductVersion,
    removeProductVersion,
  } = useContext(ProductContext);

  const [showProductModal, setShowProductModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingVersion, setEditingVersion] = useState(null);

  const handleOpenProductModal = (product = null) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleOpenVersionModal = (version = null, productId = '') => {
    setEditingVersion(
      version ? { ...version, product: version.product } : { product: productId }
    );
    setShowVersionModal(true);
  };

  const handleProductSubmit = async (values, { resetForm }) => {
    try {
      if (editingProduct) {
        await editProduct(editingProduct.id, values);
      } else {
        await addProduct(values);
      }
      resetForm();
      setShowProductModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVersionSubmit = async (values, { resetForm }) => {
    try {
      if (editingVersion && editingVersion.id) {
        await editProductVersion(editingVersion.id, values);
      } else {
        await addProductVersion(values);
      }
      resetForm();
      setShowVersionModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white text-slate-900 p-6 md:p-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Product
          </h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">
            Managing products, API keys, and product version releases.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleOpenVersionModal()}
            className="flex items-center gap-2 bg-slate-100 text-slate-900 hover:bg-slate-200 font-semibold px-4 py-2.5 rounded-lg border border-slate-300 transition-colors shadow-sm"
          >
            <FiLayers className="text-amber-600 text-lg" />
            Add Version
          </button>
          <button
            onClick={() => handleOpenProductModal()}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-lg transition-colors shadow-md"
          >
            <FiPlus className="text-lg" />
            New Product
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm">
          Failed to synchronize products: {error.message || JSON.stringify(error)}
        </div>
      )}

      {/* Table Component */}
      <ProductTable
        products={products}
        loading={loading}
        onEditProduct={handleOpenProductModal}
        onDeleteProduct={removeProduct}
        onAddVersion={handleOpenVersionModal}
        onEditVersion={handleOpenVersionModal}
        onDeleteVersion={removeProductVersion}
      />

      {/* Modals */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        editingProduct={editingProduct}
        onSubmit={handleProductSubmit}
      />

      <VersionModal
        isOpen={showVersionModal}
        onClose={() => setShowVersionModal(false)}
        editingVersion={editingVersion}
        products={products}
        onSubmit={handleVersionSubmit}
      />
    </div>
  );
}