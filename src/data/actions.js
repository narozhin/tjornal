import { initialize, reset } from 'redux-form'
import moment from 'moment'
import * as types from './action-types.js'
import { RestDB } from './restdb.js'

const restdb = new RestDB('b4d02ded3be89ec36dd3d8ce6eb0d722d49b6', 'testdb-2f4a', 'testcollection')

export const changeFormValue = (dispatch) => (key, value) => {
    dispatch({
        type: types.CHANGE_FORM_VALUE,
        payload: { key, value }
    })
}

export const updateOrder = (dispatch) => (order) => {
    dispatch(startLoading)
    return restdb.update(order._id, order).then(r => dispatch({
        type: types.UPDATE_ORDER_SUCCESS,
        payload: order
    })).catch(e => console.error(e))
}

export const addOrder = (dispatch) => (order) => {
    dispatch(startLoading)
    return restdb.push(order, validateOrder)
        .then(extractOrder)
        .then(payload => dispatch({ type: types.PUSH_ORDER, payload }))
        .catch(e => console.error(e))
}

export const removeOrder = (dispatch) => (id) => {
    dispatch(startLoading)
    restdb.remove(id).then(r => dispatch({
        type: types.REMOVE_ORDER,
        payload: id
    })).catch(e => console.error(e))
}

export const editOrder = (dispatch) => (order) =>
    dispatch(initialize('order', order))

export const resetOrder = (dispatch) => () => {
    const date = moment()
    dispatch(initialize('order', {
        date: date.format('DD.MM.YY'),
        start: date.format('HH:mm')
    }))
}

export const loadOrders = (dispatch) => (options) => {
    dispatch(startLoading)
    let total = 0
    const page = options ? options.page : 0
    restdb.count()
    .then(count => { total = count })
    .then(() => restdb.list(options))
    .then(orders => dispatch({
        type: types.SET_ORDERS,
        payload: { orders, total, page }
    }))
    .catch(e => console.error(e))
}

const validateOrder = (order) => {
    return true
}

const extractOrder = (order) => {
    const result = {}
    Object.keys(order).forEach(key => {
        if (key === '_id' || key[0] !== '_') {
            result[key] = order[key]
        }
    })
    return result
}

const startLoading = {
    type: types.START_LOADING
}
