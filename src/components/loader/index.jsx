import React from 'react'
import { Spinner } from 'elemental'
import style from './style.css'

export const Loader = () => (
    <div className="loader-wrapper">
        <Spinner className="custom-spinner" size="lg" />
    </div>
)
