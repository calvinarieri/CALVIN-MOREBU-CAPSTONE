import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInputs from '../../input/TextInputs';

const productSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string(),
  api_key: Yup.string().required('API Key is required'),
  api_secret: Yup.string(),
});


export default function ProductForm({ initialValues, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={
        initialValues || {
          name: '',
          description: '',
          api_key: '',
          api_secret: '',
        }
      }
      validationSchema={productSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="p-6 space-y-4">
          <TextInputs name="name" label="Product Name" placeholder="e.g. Auth Gateway" />
          <TextInputs name="description" label="Description" placeholder="Brief details" />
          <TextInputs name="api_key" label="API Key" placeholder="e.g. pk_live_12345" />
          <TextInputs name="api_secret" label="API Secret" placeholder="e.g. sk_live_67890" />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors"
            >
              {isSubmitting ? 'Saving...' : initialValues ? 'Update' : 'Create'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

