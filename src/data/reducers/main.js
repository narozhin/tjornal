import * as types from '../action-types.js'

const defaultState = {
    orders: [],
    total: 0,
    page: 0,
    loading: false
}

export const common = (state = defaultState, action) => {
    switch(action.type) {
        case types.SET_ORDERS:
            return { ...state, ...action.payload, loading: false }
        case types.ADD_ORDER_SUCCESS:
            return { ...state, loading: false, page: 0 }
        case types.UPDATE_ORDER_SUCCESS:
            const orders = state.orders.map((order) => {
                if (order._id !== action.payload._id) return order
                return action.payload
            })
            return { ...state, orders, loading: false }
        case types.PUSH_ORDER:
            state.orders.unshift(action.payload)
            return { ...state, loading: false }
        case types.REMOVE_ORDER:
            const newOrders = state.orders.filter(order => order._id != action.payload)
            return { ...state, orders: newOrders, loading: false }
        case types.START_LOADING:
            return { ...state, loading: true }
        default:
            return state
    }
}
