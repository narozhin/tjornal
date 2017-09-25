import React from 'react'
import { Table, Glyph, Pagination, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'elemental'
import style from './style.css'

const prepareComment = (comment) => {
    if (!comment) return ''
    return comment.length > 30
        ? comment.substring(0, 27) + '...'
        : comment
}

const getRowClassName = (forecast, result) => {
    if (!forecast) return ''
    return forecast === result ? 'row-order-success' : 'row-order-fail'
}

const Arrow = ({ direction }) => (
    <span className={`order-direction ${direction}`}>
        <Glyph icon={`arrow-${direction}`} />
    </span>
)

const EditButton = ({ id, onClick}) => {
    const onClickHandler = () => onClick && onClick(id)
    return (
        <button className="order-edit-button" type="button" onClick={onClickHandler}>
            <Glyph icon="pencil" />
        </button>
    )
}

const RemoveButton = ({ id, onClick}) => {
    const onClickHandler = () => onClick && onClick(id)
    return (
        <button className="order-remove-button" type="button" onClick={onClickHandler}>
            <Glyph icon="trashcan" />
        </button>
    )
}

const ViewCommentButton = ({ comment, onClick, id }) => {
    const _comment = prepareComment(comment)
    const onClickHandler = () => {
        onClick && onClick(id)
        return false
    }
    return (
        <a onClick={onClickHandler} className="">{_comment}</a>
    )
}

export class Orders extends React.Component {

    constructor() {
        super()
        this.state = {
            showComment: null,
            removeID: null
        }
    }

    hideModalComment() {
        this.setState({
            showComment: null
        })
    }

    hideModalRemove() {
        this.setState({
            removeID: null
        })
    }

    handlerClickEdit(_id) {
        const order = this.props.data.orders.filter( ({ id }) => _id === id )[0]
        this.props.editOrder(order)
    }

    handlerClickViewComment(id) {
        const order = this.props.data.orders.filter((order) => order.id === id )[0]
        this.setState({
            showComment: order && order.comment ? order.comment : null
        })
    }

    handlerClickRemove(id) {
        this.setState({
            removeID: id
        })
    }

    removeOrder() {
        this.props.removeOrder(this.state.removeID)
        this.hideModalRemove()
    }

    changePage(_page) {
        const page = _page - 1
        if (page !== this.props.data.page) {
            this.props.loadOrders({ page })
        }
    }

    renderRow({ id, date, assets, start, duration, comment, chart, forecast, result, summ }) {
        return (
            <tr key={id} className={getRowClassName(forecast, result)}>
                <td>#{id}</td>
                <td>{assets}</td>
                <td>{date} {start}</td>
                <td>{duration} min.</td>
                <td><ViewCommentButton id={id} comment={comment} onClick={this.handlerClickViewComment.bind(this)} /></td>
                <td>{summ}{this.props.currency || ''}</td>
                <td><Arrow direction={forecast} /></td>
                <td><Arrow direction={result} /></td>
                <td>
                    <EditButton id={id} onClick={this.handlerClickEdit.bind(this)}/>
                    <RemoveButton id={id} onClick={this.handlerClickRemove.bind(this)}/>
                </td>
            </tr>
        )
    }

    render() {
        const { orders, total, page } = this.props.data
        return (
            <div>
                { total > 15 &&
                    <Pagination currentPage={page + 1} pageSize={15} total={total} limit={5} onPageSelect={this.changePage.bind(this)} />
                }
                <Table>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="20%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Assets</th>
                            <th>Start</th>
                            <th>Duration</th>
                            <th>Comment</th>
                            <th>Summ</th>
                            <th>Forecast</th>
                            <th>Result</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.data.orders.map(this.renderRow.bind(this)) }
                    </tbody>
                </Table>
                <Modal isOpen={!!this.state.showComment} onCancel={this.hideModalComment.bind(this)} backdropClosesModal>
                    <ModalHeader text="View order comment" showCloseButton onClose={this.hideModalComment.bind(this)} />
                    <ModalBody>
                        {this.state.showComment || ''}
                    </ModalBody>
                </Modal>
                <Modal isOpen={!!this.state.removeID} width="small" onCancel={this.hideModalRemove.bind(this)} backdropClosesModal>
                    <ModalHeader text={`Remove deal`} showCloseButton onClose={this.hideModalRemove.bind(this)} />
                    <ModalBody>
                        Do you want remove deal #{this.state.removeID}?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.removeOrder.bind(this)} className="modal-footer-button" type="danger">Remove</Button>
                        <Button type="success" onClick={this.hideModalRemove.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
