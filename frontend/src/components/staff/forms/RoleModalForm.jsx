import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RoleSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Role name must be at least 2 characters")
    .max(50, "Role name cannot exceed 50 characters")
    .required("Role name is required"),
});

export function RoleModalForm({ isOpen, onClose, onSubmit, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-slate-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Create New Role
        </h3>

        <Formik
          initialValues={{ name: "" }}
          validationSchema={RoleSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await onSubmit(values);
            setSubmitting(false);
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Role Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="e.g. Manager, Accountant"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-xs text-rose-600 mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors disabled:opacity-50"
                >
                  {loading || isSubmitting ? "Creating..." : "Save Role"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}