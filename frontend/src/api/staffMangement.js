import { protectedAxiosInstance } from "./axios";

const STAFF_URL = "/auth/staff/";
const ROLES_URL = "/auth/roles/";


export const fetchStaffMembers = async () => {
  try {
    const response = await protectedAxiosInstance.get(STAFF_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff members:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const fetchStaffById = async (id) => {
  try {
    const response = await protectedAxiosInstance.get(`${STAFF_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching staff member ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const createStaffMember = async (staffData) => {
  try {
    const response = await protectedAxiosInstance.post(STAFF_URL, staffData);
    return response.data;
  } catch (error) {
    console.error("Error creating staff member:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateStaffMember = async (id, staffData, partial = false) => {
  try {
    const method = partial ? "patch" : "put";
    const response = await protectedAxiosInstance[method](`${STAFF_URL}${id}/`, staffData);
    return response.data;
  } catch (error) {
    console.error(`Error updating staff member ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteStaffMember = async (id) => {
  try {
    const response = await protectedAxiosInstance.delete(`${STAFF_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting staff member ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const fetchRoles = async () => {
  try {
    const response = await protectedAxiosInstance.get(ROLES_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const fetchRoleById = async (id) => {
  try {
    const response = await protectedAxiosInstance.get(`${ROLES_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching role ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const createRole = async (roleData) => {
  try {
    console.log()
    const response = await protectedAxiosInstance.post(ROLES_URL, roleData);
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateRole = async (id, roleData, partial = false) => {
  try {
    const method = partial ? "patch" : "put";
    const response = await protectedAxiosInstance[method](`${ROLES_URL}${id}/`, roleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await protectedAxiosInstance.delete(`${ROLES_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting role ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};