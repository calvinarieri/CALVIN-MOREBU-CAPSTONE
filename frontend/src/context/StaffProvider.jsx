import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  fetchStaffMembers,
  fetchStaffById,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  fetchRoles,
  fetchRoleById,
  createRole as createRoleApi,
  updateRole as updateRoleApi,
  deleteRole as deleteRoleApi,
} from "../api/staffMangement";

const StaffContext = createContext(null);

export function StaffProvider({ children }) {
  const [staff, setStaff] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [staffData, rolesData] = await Promise.all([
        fetchStaffMembers(),
        fetchRoles(),
      ]);

      setStaff(staffData.data || staffData);
      setRoles(rolesData.data || rolesData);
    } catch (err) {
      console.error("Staff data fetch error:", err);
      setError("Failed to fetch staff or roles data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const getStaffById = async (id) => {
    return await fetchStaffById(id);
  };

  const createStaff = async (staffData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createStaffMember(staffData);
      const newStaff = response.data || response;

      setStaff((prev) => [...prev, newStaff]);

      return newStaff;
    } catch (err) {
      setError("Failed to create staff member.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStaff = async (id, staffData, partial = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateStaffMember(id, staffData, partial);
      const updatedStaff = response.data || response;

      setStaff((prev) =>
        prev.map((item) => (item.id === id ? updatedStaff : item))
      );

      return updatedStaff;
    } catch (err) {
      setError("Failed to update staff member.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteStaff = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await deleteStaffMember(id);

      setStaff((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete staff member.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRoleById = async (id) => {
    return await fetchRoleById(id);
  };

  const createRole = async (roleData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createRoleApi(roleData);
      const newRole = response.data || response;

      setRoles((prev) => [...prev, newRole]);

      return newRole;
    } catch (err) {
      setError("Failed to create role.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, roleData, partial = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateRoleApi(id, roleData, partial);
      const updatedRole = response.data || response;

      setRoles((prev) =>
        prev.map((item) => (item.id === id ? updatedRole : item))
      );

      return updatedRole;
    } catch (err) {
      setError("Failed to update role.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await deleteRoleApi(id);

      setRoles((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete role.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <StaffContext.Provider
      value={{
        staff,
        roles,
        loading,
        error,
        reloadStaffData: loadInitialData,
        getStaffById,
        createStaff,
        updateStaff,
        deleteStaff,
        getRoleById,
        createRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
}

export const useStaff = () => useContext(StaffContext);