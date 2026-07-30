import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInputs from '../../input/TextInputs';

const versionSchema = Yup.object().shape({
  product: Yup.string().required('Product is required'),
  version: Yup.string().required('Version identifier is required'),
  description: Yup.string(),
});

export default function VersionForm({ initialValues, products, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={
        initialValues || {
          product: '',
          version: '',
          description: '',
        }
      }
      validationSchema={versionSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="p-6 space-y-4">
          <TextInputs
            name="product"
            label="Associated Product"
            placeholder="Select product"
            options={products.map((p) => ({ key: p.id, value: p.name }))}
          />
          <TextInputs name="version" label="Version" placeholder="e.g. v1.0.0" />
          <TextInputs
            name="description"
            label="Release Notes / Description"
            placeholder="Patch release details"
          />

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
              {isSubmitting
                ? 'Saving...'
                : initialValues?.id
                ? 'Update Version'
                : 'Add Version'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}