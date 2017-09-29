import React from 'react'
import { Modal, ModalHeader, ModalBody, FormInput, Glyph } from 'elemental'
import style from './style.css'

export class CommentInput extends React.Component {

    constructor() {
        super()
        this.state = {
            showModal: false
        }
    }

    componentDidMount() {
        console.log(this.props.input.value)
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        return (
            <div className="add-comment-btn">
                <a href="#" onClick={this.toggleModal.bind(this)}>
                    <Glyph icon="comment" />
                    {this.props.input.value
                        ? 'Edit comment'
                        : 'Add comment'
                    }
                </a>
                <Modal isOpen={this.state.showModal} onCancel={this.toggleModal.bind(this)} backdropClosesModal>
                    <ModalHeader text="Select time" showCloseButton onClose={this.toggleModal.bind(this)} />
                    <ModalBody>
                        <FormInput rows="20" multiline placeholder="Enter comment" {...this.props.input} />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
