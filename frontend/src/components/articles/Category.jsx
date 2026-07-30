import React, { useState, useContext } from 'react'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { HiFolderPlus, HiXMark } from 'react-icons/hi2'
import TextInputs from '../input/TextInputs'
import { CategoryContext } from '../../context/CategoryProvider'

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .max(100, 'Category name must be 100 characters or less')
    .required('Category name is required'),
  description: Yup.string().nullable(),
})

export default function Category({ onSubmitCategory, onMenuClose }) {
  const [isOpen, setIsOpen] = useState(false)
  const { createCategory } = useContext(CategoryContext)

  const handleOpen = () => {
    setIsOpen(true)
    if (onMenuClose) onMenuClose()
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="w-full flex items-center space-x-3 p-2.5 rounded-xl text-left text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors group cursor-pointer"
      >
        <div className="p-2 rounded-lg bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors">
          <HiFolderPlus size={18} />
        </div>
        <div>
          <div className="text-sm font-semibold">Add Category</div>
          <div className="text-xs text-gray-400">Create a new product group</div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Add New Category</h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <HiXMark size={20} />
              </button>
            </div>

            <Formik
              initialValues={{
                name: '',
                description: '',
              }}
              validationSchema={CategorySchema}
              onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
                try {
                  const res = createCategory 
                    ? await createCategory(values) 
                    : onSubmitCategory 
                      ? await onSubmitCategory(values) 
                      : null

                  if (res && !res.success) {
                    if (res.data?.name) {
                      setFieldError('name', Array.isArray(res.data.name) ? res.data.name[0] : res.data.name)
                    } else if (res.data?.detail || res.data?.message) {
                      setFieldError('name', res.data.detail || res.data.message)
                    }
                    return
                  }

                  resetForm()
                  handleClose()
                } catch (error) {
                  console.error('Failed to create category:', error)
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <div className="p-4 space-y-4">
                  <div>
                    <TextInputs
                      name="name"
                      label="Category Name *"
                      placeholder="e.g. Cloud Services"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-xs text-red-500 mt-1"
                    />
                  </div>

                  <div>
                    <TextInputs
                      name="description"
                      label="Description"
                      placeholder="Enter category description..."
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-xs text-red-500 mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Category'}
                    </button>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  )
}