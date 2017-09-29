import React from 'react'
import { FormField, FormSelect } from 'elemental'
import { Tooltip } from '..'
import style from './style.css'

export const RFormSelect = ({ input, label, type, name, placeholder, options, meta: { error, active } }) => (
    <FormField label={label} htmlFor={name}>
        <div className="field-wrapper" >
            <FormSelect className={ error && 'select-error' } {...input} options={options} />
            { error && active && <Tooltip text={error} /> }
        </div>
    </FormField>
)
