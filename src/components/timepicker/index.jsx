import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormInput, FormField, Button, Row, Col } from 'elemental'
import { RFormInput } from '..'
import style from './style.css'

const prepareNum = (value) => Number(value) < 10 ? '0' + value : value

export class TimePicker extends React.Component {

    constructor() {
        super()
        const date = new Date()
        this.state = {
            opened: false,
            hours: '00',
            minutes: '00'
        }
    }

    componentWillReceiveProps(nextProps) {
        const { value } = nextProps.input
        const buff = value.split(':')
        const state = buff.length === 2
            ? { hours: buff[0], minutes: buff[1] }
            : { hours: '00', minutes: '00' }
        this.setState(state)
    }

    toggleModal() {
        this.setState({
            opened: !this.state.opened
        })
    }

    onChangeValue() {
        const value = this.state.hours + ':' + this.state.minutes
        this.props.input.onChange(value)
        this.toggleModal()
    }

    onChangeTime(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <RFormInput {...this.props} onClick={this.toggleModal.bind(this)} />
                <Modal isOpen={this.state.opened} width="small" onCancel={this.toggleModal.bind(this)} backdropClosesModal>
                    <ModalHeader text="Select time" showCloseButton onClose={this.toggleModal.bind(this)} />
                    <ModalBody>
                        <div className="time-wrapper">
                            <input name="hours" className="time-input" onChange={this.onChangeTime.bind(this)} value={this.state.hours} type="text" />
                            :
                            <input name="minutes" className="time-input" onChange={this.onChangeTime.bind(this)} value={this.state.minutes} type="text" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="success" onClick={this.onChangeValue.bind(this)}>Set time</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
