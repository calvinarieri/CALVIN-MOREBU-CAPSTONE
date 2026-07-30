import { protectedAxiosInstance } from "./axios";

const PRODUCTS_URL = "/prod/actual/";
const VERSIONS_URL = "/prod/versions/";

export const fetchProducts = async () => {
  try {
    const response = await protectedAxiosInstance.get(PRODUCTS_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products");
    throw error.response?.data || error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await protectedAxiosInstance.get(`${PRODUCTS_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await protectedAxiosInstance.post(PRODUCTS_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateProduct = async (id, productData, partial = false) => {
  try {
    const method = partial ? "patch" : "put";
    const response = await protectedAxiosInstance[method](`${PRODUCTS_URL}${id}/`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await protectedAxiosInstance.delete(`${PRODUCTS_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const fetchProductVersions = async () => {
  try {
    const response = await protectedAxiosInstance.get(VERSIONS_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching product versions:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const fetchProductVersionById = async (id) => {
  try {
    const response = await protectedAxiosInstance.get(`${VERSIONS_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching version ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const createProductVersion = async (versionData) => {
  try {
    const response = await protectedAxiosInstance.post(VERSIONS_URL, versionData);
    return response.data;
  } catch (error) {
    console.error("Error creating version:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateProductVersion = async (id, versionData, partial = false) => {
  try {
    const method = partial ? "patch" : "put";
    const response = await protectedAxiosInstance[method](`${VERSIONS_URL}${id}/`, versionData);
    return response.data;
  } catch (error) {
    console.error(`Error updating version ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteProductVersion = async (id) => {
  try {
    const response = await protectedAxiosInstance.delete(`${VERSIONS_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting version ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};