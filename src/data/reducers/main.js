import * as types from '../action-types.js'

const defaultState = {
    orders: [],
    total: 0,
    loading: true,
    page: 0
}

export const common = (state = defaultState, action) => {
    switch(action.type) {
        case types.SET_ORDERS:
            return { ...state, ...action.payload }
        case types.ADD_ORDER_SUCCESS:
            return { ...state, loading: false, page: 0 }
        case types.UPDATE_ORDER_SUCCESS:
            const orders = state.orders.map((order) => {
                if (order.id !== action.payload.id) return order
                return action.payload
            })
            return { ...state, orders }
        default:
            return state
    }
}
