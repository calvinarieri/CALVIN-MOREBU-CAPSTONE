import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StaffSchema = (isEditing) =>
  Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: isEditing
      ? Yup.string().min(6, "Password must be at least 6 characters")
      : Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
    role: Yup.string().nullable(),
    is_active: Yup.boolean(),
  });

export function StaffModalForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  roles,
  loading,
}) {
  if (!isOpen) return null;

  const initialValues = {
    first_name: initialData?.first_name || "",
    last_name: initialData?.last_name || "",
    email: initialData?.email || "",
    password: "",
    role: initialData?.role?.id || initialData?.role || "",
    is_active: initialData?.is_active ?? true,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-slate-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {initialData ? "Edit Staff Member" : "Create New Staff Member"}
        </h3>

        <Formik
          initialValues={initialValues}
          validationSchema={StaffSchema(!!initialData)}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            // Remove empty password on edit if not changed
            const payload = { ...values };
            if (initialData && !payload.password) {
              delete payload.password;
            }
            await onSubmit(payload);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="first_name"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-xs text-rose-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="last_name"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-xs text-rose-600 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-xs text-rose-600 mt-1"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  {initialData
                    ? "Password (leave blank to keep current)"
                    : "Password"}
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs text-rose-600 mt-1"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Assign Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                >
                  <option value="">Select a role...</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-xs text-rose-600 mt-1"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Field
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-600 h-4 w-4"
                />
                <label
                  htmlFor="is_active"
                  className="text-sm font-medium text-gray-700"
                >
                  Active Account
                </label>
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
                  {loading || isSubmitting
                    ? "Saving..."
                    : initialData
                    ? "Update Staff"
                    : "Create Staff"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}