import React, { useState, useContext, useRef, useEffect } from 'react'
import { ProductContext } from '../../context/ProductsProvider'

export default function ProductChoices({ handleSelectedProduct }) {
  const { products, versions } = useContext(ProductContext)

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedVersion, setSelectedVersion] = useState(null)

  const [isProductOpen, setIsProductOpen] = useState(false)
  const [isVersionOpen, setIsVersionOpen] = useState(false)

  const productRef = useRef(null)
  const versionRef = useRef(null)

  const availableVersions = selectedProduct
    ? versions.filter((ver) => ver.product === selectedProduct.id)
    : []

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setSelectedVersion(null)
    setIsProductOpen(false)

  }

  const handleSelectVersion = (version) => {
    setSelectedVersion(version)
    setIsVersionOpen(false)

    if (handleSelectedProduct) {
      handleSelectedProduct(version.id)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productRef.current && !productRef.current.contains(event.target)) {
        setIsProductOpen(false)
      }
      if (versionRef.current && !versionRef.current.contains(event.target)) {
        setIsVersionOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="space-y-6 max-w-md">
      <div className="relative space-y-2" ref={productRef}>
        <label className="text-sm font-semibold text-gray-700">Select Product</label>

        <button
          type="button"
          onClick={() => setIsProductOpen((prev) => !prev)}
          className="w-full text-left px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center transition-all"
        >
          {selectedProduct ? (
            <div>
              <div className="font-semibold text-gray-800">{selectedProduct.name}</div>
              <div className="text-xs text-gray-500">{selectedProduct.description}</div>
            </div>
          ) : (
            <span className="text-gray-400">-- Choose a Product --</span>
          )}
          <span className="text-xs text-gray-400 ml-2">▼</span>
        </button>

        {isProductOpen && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {products && products.length > 0 ? (
              products.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0 border-gray-100 transition-colors"
                >
                  <div className="font-semibold text-sm text-gray-800">{prod.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{prod.description}</div>
                </div>
              ))
            ) : (
              <div className="p-3 text-sm text-gray-400">No products available</div>
            )}
          </div>
        )}
      </div>

      <div className="relative space-y-2" ref={versionRef}>
        <label
          className={`text-sm font-semibold transition-colors ${
            !selectedProduct ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          Select Product Version
        </label>

        <button
          type="button"
          disabled={!selectedProduct}
          onClick={() => setIsVersionOpen((prev) => !prev)}
          className={`w-full text-left px-4 py-2.5 rounded-lg border shadow-sm transition-all flex justify-between items-center ${
            !selectedProduct
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {selectedVersion ? (
            <div>
              <div className="font-semibold text-gray-800">{selectedVersion.name}</div>
              <div className="text-xs text-gray-500">
                {selectedVersion.version || selectedVersion.description}
              </div>
            </div>
          ) : (
            <span className="text-gray-400">
              {selectedProduct
                ? '-- Choose a Version --'
                : '-- Select a product first --'}
            </span>
          )}
          <span className="text-xs text-gray-400 ml-2">▼</span>
        </button>

        {isVersionOpen && selectedProduct && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {availableVersions.length > 0 ? (
              availableVersions.map((ver) => (
                <div
                  key={ver.id}
                  onClick={() => handleSelectVersion(ver)}
                  className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0 border-gray-100 transition-colors"
                >
                  <div className="font-semibold text-sm text-gray-800">{ver.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {ver.version || ver.description}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-sm text-gray-400">
                No versions available for this product
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}