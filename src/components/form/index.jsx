import React from 'react'
import { Form, Glyph, FormField, FormInput, Button, FormSelect, Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental'
import { TimePicker } from '../timepicker/index.jsx'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css';
import style from './style.css'

const options = [{ label: 'UP', value: 'up'}, { label: 'DOWN', value: 'down' }]

const setInputProps = (order, onChange) => (name) => ({
    value: order[name],
    onChange: onChange.bind(this),
    name: name
})

class DateInput extends React.Component {

    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }

    handleChange (date) {
        this.props.onChange({ target: {
            name: this.props.name,
            value: date.format('DD.MM.YY')
        }})
        this.toggleCalendar()
    }

    toggleCalendar (e) {
        e && e.preventDefault()
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <div>
                <FormInput {...this.props} placeholder="Enter date" onClick={this.toggleCalendar.bind(this)} />
                {
                    this.state.isOpen &&
                    <DatePicker
                        selected={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        withPortal
                        inline
                    />
                }
            </div>
        )
    }
}

export class FormOrder extends React.Component {

    constructor() {
        super()
        this.state = {
            showModal: false
        }
    }

    saveOrder() {
        const { id } = this.props.order
        id ? this.props.updateOrder(this.props.order) : this.props.addOrder(this.props.order)
    }

    onChangeForecast(value) {
        console.log(value)
        this.onChangeValue({ target: { name: 'forecast', value } })
    }

    onChangeResult(value) {
        this.onChangeValue({ target: { name: 'result', value } })
    }

    onChangeValue(e) {
        const { name, value } = e.target
        console.log(name, value)
        this.props.changeFormValue(name, value)
    }

    hideModalComment() {
        this.setState({
            showModal: false
        })
    }

    openCommentModal() {
        this.setState({
            showModal: true
        })
        return false
    }

    render() {
        const { order } = this.props
        const inputProps = setInputProps(order, this.onChangeValue.bind(this))
        return (
            <div>
                <Form>
                    <FormField label="Assets" htmlFor="assets">
                        <FormInput autoFocus type="text" placeholder="Enter assets" {...inputProps('assets')}/>
                    </FormField>
                    <FormField label="Date" htmlFor="date">
                        <DateInput {...inputProps('date')}/>
                    </FormField>
                    <TimePicker label="Time" name="start" placeholder="Enter time" />
                    <FormField label="Duration" htmlFor="duration">
                        <FormInput type="text" placeholder="Enter duration" {...inputProps('duration')} />
                    </FormField>
                    <FormField label="Summ" htmlFor="summ">
                        <FormInput type="text" placeholder="Enter summ" {...inputProps('summ')} />
                    </FormField>
                    <FormField label="Percent" htmlFor="percent">
                        <FormInput type="text" placeholder="Enter percent" {...inputProps('percent')} />
                    </FormField>
                    <FormField label="Forecast" htmlFor="forecast">
                        <FormSelect value={order.forecast} options={options} name="forecast" onChange={this.onChangeForecast.bind(this)} />
                    </FormField>
                    <FormField label="Result" htmlFor="result">
                        <FormSelect value={order.result} options={options} name="result" onChange={this.onChangeResult.bind(this)} />
                    </FormField>
                    <FormField>
                        <a href="#" className="add-comment-btn" onClick={this.openCommentModal.bind(this)}>
                            <Glyph icon="comment" />
                            {order.comment.length ? 'Edit comment' : 'Add comment'}
                        </a>
                    </FormField>
                    <Button type="success" onClick={this.saveOrder.bind(this)}>{this.props.order.id ? 'Update' : 'Save'}</Button>
                    {this.props.order.id &&
                        <div className="inline-form-button-wrapper">
                            <Button type="danger" onClick={this.props.resetOrder}>Cancel</Button>
                        </div>
                    }
                </Form>
                <Modal width="large" isOpen={this.state.showModal} onCancel={this.hideModalComment.bind(this)} backdropClosesModal>
                    <ModalHeader text="Comment" showCloseButton onClose={this.hideModalComment.bind(this)} />
                    <ModalBody>
                        <FormInput rows="20" className="form-input-comment" multiline placeholder="Enter comment" {...inputProps('comment')} />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
