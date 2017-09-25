import * as types from './action-types.js'

export const changeFormValue = (dispatch) => (key, value) => {
    dispatch({
        type: types.CHANGE_FORM_VALUE,
        payload: { key, value }
    })
}

export const updateOrder = (dispatch) => (order) => {
    if (window.db.update(order)) {
        dispatch({
            type: types.UPDATE_ORDER_SUCCESS,
            payload: order
        })
    }
}

export const addOrder = (dispatch) => (order) => {
    if (window.db.add(order)) {
        dispatch({
            type: types.ADD_ORDER_SUCCESS
        })
        loadOrders(dispatch)()
    }
}

export const removeOrder = (dispatch) => (id) => {
    if (window.db.remove(id)) {
        loadOrders(dispatch)()
    }
}

export const editOrder = (dispatch) => (order) => {
    dispatch({
        type: types.EDIT_ORDER,
        payload: order
    })
}

export const resetOrder = (dispatch) => () => dispatch({
    type: types.RESET_ORDER
})

export const loadOrders = (dispatch) => (options) => {
    dispatch({
        type: types.SET_ORDERS,
        payload: window.db.get(options)
    })
}
