import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'elemental'
import { Box, Orders, FormOrder, NoDeals } from './components'
import * as actions from './data/actions.js'
import style from './style.css'

class _App extends React.Component {

    componentDidMount() {
        this.props.loadOrders()
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col sm="100%" md="70%">
                        <Box icon="book" title="Deals">
                            {
                                this.props.orders.total
                                    ? <Orders
                                        currency="р"
                                        data={this.props.orders}
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
                            <FormOrder  {... this.props} />
                        </Box>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: { ...state.common },
    order: { ...state.order }
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
