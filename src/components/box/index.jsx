import React from 'react'
import { Glyph } from 'elemental'
import style from './style.css'

export const Box = ({ title, icon, children }) => (
    <div className="box">
        <div className="box-header">
            {icon && <Glyph icon={icon} />} {title}
        </div>
        { children }
    </div>
)
