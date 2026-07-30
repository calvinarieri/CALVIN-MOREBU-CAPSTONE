import React, { createContext, useState, useEffect, useCallback } from "react";

import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductVersions,
  fetchProductVersionById,
  createProductVersion,
  updateProductVersion,
  deleteProductVersion,
} from "../api/products";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProducts();
      setProducts(res.data || []);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await fetchProductById(id);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createProduct(productData);
      setProducts((prev) => [...prev, res.data]);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const editProduct = useCallback(async (id, productData, partial = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateProduct(id, productData, partial);
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductVersions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProductVersions();
      setVersions(res.data || []);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductVersionById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await fetchProductVersionById(id);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addProductVersion = useCallback(async (versionData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createProductVersion(versionData);
      setVersions((prev) => [...prev, res.data]);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const editProductVersion = useCallback(async (id, versionData, partial = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateProductVersion(id, versionData, partial);
      setVersions((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeProductVersion = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteProductVersion(id);
      setVersions((prev) => prev.filter((item) => item.id !== id));
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
    getProductVersions();
  }, [getProducts, getProductVersions]);

  const value = {
    products,
    versions,
    loading,
    error,
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    removeProduct,
    getProductVersions,
    getProductVersionById,
    addProductVersion,
    editProductVersion,
    removeProductVersion,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};