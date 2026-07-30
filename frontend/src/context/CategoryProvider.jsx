import React, { createContext, useState, useEffect, useCallback } from 'react'
import {
  getCategories,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  patchCategory as apiPatchCategory,
  deleteCategory as apiDeleteCategory,
} from '../api/articles'

export const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    const res = await getCategories()
    if (res.success) {
      setCategories(res.data)
    } else {
      setError(res.data?.message || 'Failed to fetch categories')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const createCategory = async (categoryData) => {
    const res = await apiCreateCategory(categoryData)
    if (res.success) {
      setCategories((prev) => [...prev, res.data])
    }
    return res
  }

  const updateCategory = async (id, categoryData) => {
    const res = await apiUpdateCategory(id, categoryData)
    if (res.success) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? res.data : cat))
      )
    }
    return res
  }

  const patchCategory = async (id, categoryData) => {
    const res = await apiPatchCategory(id, categoryData)
    if (res.success) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? res.data : cat))
      )
    }
    return res
  }

  const deleteCategory = async (id) => {
    const res = await apiDeleteCategory(id)
    if (res.success) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
    }
    return res
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        patchCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}