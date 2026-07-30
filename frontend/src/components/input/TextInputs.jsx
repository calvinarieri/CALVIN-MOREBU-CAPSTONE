import React from 'react'
import { Field } from 'formik'

export default function TextInputs({
    name,
    placeholder,
    label,
    options,
    type = 'text'
}) {
  return (
    <div className="space-y-4">
        {label && <label htmlFor={name} className='font-bold py-4'>{label}</label>}
        
        {options && options.length > 0 ? (
            <Field
                as="select"
                id={name}
                name={name}
                className=""
            >
                {placeholder && <option value="">{placeholder}</option>}
            
                {options.map((option) => (
                    <option key={option.key} value={option.key}>
                        {option.value}
                    </option>
                ))}
            </Field>
        ) : (
            <Field
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                className="outline-none w-full border-2 border-gray-400 rounded-lg p-2"
            />
        )}
    </div>
  )
}