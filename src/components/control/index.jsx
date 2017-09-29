import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Button } from 'elemental'
import { RFormInput, RFormSelect, DateInput, TimePicker, CommentInput } from '..'
import style from './style.css'

const pairs = [
    { label: 'NO SELECTED', value: '' },
    { label: 'CHFJPY', value: 'CHFJPY' },
    { label: 'EURUSD', value: 'EURUSD' }
]

const direction = [
    { label: 'NO SELECTED', value: '' },
    { label: 'UP', value: 'up' },
    { label: 'DOWN', value: 'down' }
]

export class _ControlForm extends React.Component {

    componentDidMount() {
        this.props.resetOrder()
    }

    handlerSubmit() {
        const { addOrder, updateOrder, resetOrder, orders } = this.props
        return (values) => new Promise((resolve) => {
            const errors = validateForm(values)
            if (Object.keys(errors).length) {
                throw new SubmissionError(errors)
            }
            const action = values._id ? updateOrder : addOrder
            action(values).then(resolve).then(resetOrder)
        })
    }

    render() {
        const formValues = this.props.formValues || {}
        return (
            <form onSubmit={this.props.handleSubmit(this.handlerSubmit())}>
                <Field label="Select pair" name="assets" component={RFormSelect} options={pairs} />
                <Field label="Date" placeholder="Enter date" name="date" component={DateInput} />
                <Field label="Start" placeholder="Enter time" name="start" component={TimePicker} />
                <Field label="Duration" placeholder="Enter duration" name="duration" component={RFormInput} />
                <Field label="Summ" placeholder="Enter summ" name="summ" component={RFormInput} />
                <Field label="Percent" placeholder="Enter percent" name="percent" component={RFormInput} />
                <Field label="Forecast" name="forecast" component={RFormSelect} options={direction} />
                <Field label="Result" name="result" component={RFormSelect} options={direction} />
                <Field name="comment" component={CommentInput} />
                <Button type="success" submit={true}>
                    { formValues._id ? 'Update' : 'Save' }
                </Button>
                {
                    formValues._id && <Button className="reset-button" type="danger" onClick={this.props.resetOrder}>Cancel</Button>
                }
            </form>
        )
    }
}

const validateForm = (values) => {
    const errors = {}
    Object.keys(validateRules).forEach(rule => {
        if (!validateRules[rule](values[rule])) {
            errors[rule] = 'Required field'
        }
    })
    return errors
}

const validateRules = {
    assets: (value) => value && value.length,
    date: (value) => value && value.length,
    start: (value) => value && value.length,
    duration: (value) => value && value.length,
    summ: (value) => value && value.length,
    forecast: (value) => value && value.length,
    percent: (value) => value && value.length
}

export const ControlForm = reduxForm({
  form: 'order'
})(_ControlForm)
