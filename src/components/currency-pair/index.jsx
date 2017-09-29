import React from 'react'
import { FormField, Button, FormSelect } from 'elemental'

const options = [
    { label: 'NO SELECTED', value: '' },
    { label: 'CHFJPY', value: 'CHFJPY'},
    { label: 'EURUSD', value: 'EURUSD'}
]

export class CurrencyPair extends React.Component {

    onChange(value) {
        this.props.onChange({
            target: { name: this.props.name, value }
        })
    }

    render() {
        return (
            <FormField label="Currency pair" htmlFor="pair">
                <FormSelect value={this.props.value} options={options} name="pair" onChange={this.onChange.bind(this)} />
            </FormField>
        )
    }
}
