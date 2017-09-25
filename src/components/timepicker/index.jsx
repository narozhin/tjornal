import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormInput, FormField, Button } from 'elemental'
import style from './style.css'

export class TimePicker extends React.Component {

    constructor() {
        super()
        this.state = {
            opened: true,
            hours: '00',
            minutes: '00'
        }
    }

    toggleModal() {
        this.setState({
            opened: !this.state.opened
        })
    }

    onChangeValue() {
        this.props.onChange &&
        this.props.onChange(
            this.state.hours + ':' + this.state.minutes
        )
        this.toggleModal()
    }

    render() {
        return (
            <div>
                <FormField label={this.props.label || ''} htmlFor={this.props.name || ''}>
                    <FormInput onClick={this.toggleModal.bind(this)} type="text" placeholder={this.props.placeholder || ''} name={this.props.name || ''} value={this.props.value || ''} />
                </FormField>
                <Modal isOpen={this.state.opened} width="small" onCancel={this.toggleModal.bind(this)} backdropClosesModal>
                    <ModalHeader text="Select time" showCloseButton onClose={this.toggleModal.bind(this)} />
                    <ModalBody>
                        Test modal
                    </ModalBody>
                    <ModalFooter>
                        <Button type="success" onClick={this.onChangeValue.bind(this)}>Set time</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
