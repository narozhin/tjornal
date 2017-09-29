import React from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { Row, Col } from 'elemental'
import { Box, Orders, NoDeals, WindowFrame, Loader, ControlForm } from './components'
import * as actions from './data/actions.js'
import style from './style.css'

class _App extends React.Component {

    componentDidMount() {
        this.props.loadOrders()
    }

    render() {
        const { orders } = this.props.data
        return (
            <div>
                <WindowFrame />
                <div className="container">
                    <Row>
                        <Col sm="100%" md="70%">
                            <Box icon="book" title="Deals">
                                {
                                    orders.length
                                        ? <Orders
                                            currency="р"
                                            data={this.props.data}
                                            loadOrders={this.props.loadOrders}
                                            editOrder={this.props.editOrder}
                                            removeOrder={this.props.removeOrder}
                                          />
                                        : <NoDeals />
                                }
                            </Box>
                        </Col>
                        <Col sm="100%" md="30%">
                            <Box icon="settings" title="Controll">
                                <ControlForm
                                    formValues={this.props.values}
                                    orders={orders}
                                    resetOrder={this.props.resetOrder}
                                    updateOrder={this.props.updateOrder}
                                    addOrder={this.props.addOrder}
                                />
                            </Box>
                        </Col>
                    </Row>
                </div>
                {this.props.data.loading && <Loader />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.common,
    values: getFormValues('order')(state),
    order: state.order
})

const mapActionsToProps = (dispatch) => ({
    changeFormValue: actions.changeFormValue(dispatch),
    updateOrder: actions.updateOrder(dispatch),
    addOrder: actions.addOrder(dispatch),
    editOrder: actions.editOrder(dispatch),
    resetOrder: actions.resetOrder(dispatch),
    removeOrder: actions.removeOrder(dispatch),
    loadOrders: actions.loadOrders(dispatch)
})

export const App = connect(mapStateToProps, mapActionsToProps)(_App)
