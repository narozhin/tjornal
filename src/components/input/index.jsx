import React from 'react'
import { FormField, FormInput } from 'elemental'
import { Tooltip } from '..'
import style from './style.css'

export const RFormInput = ({ input, label, name, placeholder, onClick, meta: { error, active } }) => (
    <FormField label={label} htmlFor={name}>
        <div className="field-wrapper" >
            <FormInput onClick={onClick} type="text" className={ error && 'input-error' } placeholder={placeholder} {...input} />
            { error && active && <Tooltip text={error} /> }
        </div>
    </FormField>
)
