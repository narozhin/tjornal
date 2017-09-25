import React from 'react'
import { Form, FormField, FormInput, Button, FormSelect } from 'elemental'
import style from './style.css'

const options = [{ label: 'UP', value: 'up'}, { label: 'DOWN', value: 'down' }]

const setInputProps = (order, onChange) => (name) => ({
    value: order[name],
    onChange: onChange.bind(this),
    name: name
})

export class FormOrder extends React.Component {

    saveOrder() {
        const { id } = this.props.order
        id ? this.props.updateOrder(this.props.order) : this.props.addOrder(this.props.order)
    }

    onChangeForecast(value) {
        this.onChangeValue({ target: { name: 'forecast', value } })
    }

    onChangeResult(value) {
        this.onChangeValue({ target: { name: 'result', value } })
    }

    onChangeValue(e) {
        const { name, value } = e.target
        this.props.changeFormValue(name, value)
    }

    render() {
        const { order } = this.props
        const inutProps = setInputProps(order, this.onChangeValue.bind(this))
        return (
            <div>
                <Form>
                    <FormField label="Assets" htmlFor="assets">
                        <FormInput autoFocus type="text" placeholder="Enter assets" {...inutProps('assets')}/>
                    </FormField>
                    <FormField label="Start time" htmlFor="start">
                        <FormInput type="text" placeholder="Enter open time" {...inutProps('start')} />
                    </FormField>
                    <FormField label="Duration" htmlFor="duration">
                        <FormInput type="text" placeholder="Enter duration" {...inutProps('duration')} />
                    </FormField>
                    <FormField label="Summ" htmlFor="summ">
                        <FormInput type="text" placeholder="Enter summ" {...inutProps('summ')} />
                    </FormField>
                    <FormField label="Percent" htmlFor="percent">
                        <FormInput type="text" placeholder="Enter percent" {...inutProps('percent')} />
                    </FormField>
                    <FormField label="Forecast" htmlFor="forecast">
                        <FormSelect options={options} name="forecast" onChange={this.onChangeForecast.bind(this)} />
                    </FormField>
                    <FormField label="Result" htmlFor="result">
                        <FormSelect options={options} name="result" onChange={this.onChangeResult.bind(this)} />
                    </FormField>
                    <FormField label="Comment" htmlFor="comment">
                        <FormInput multiline placeholder="Enter comment" {...inutProps('comment')} />
                    </FormField>
                    <Button type="success" onClick={this.saveOrder.bind(this)}>{this.props.order.id ? 'Update' : 'Save'}</Button>
                    {this.props.order.id &&
                        <div className="inline-form-button-wrapper">
                            <Button type="danger" onClick={this.props.resetOrder}>Cancel</Button>
                        </div>
                    }
                </Form>
            </div>
        )
    }
}
