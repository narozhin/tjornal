import * as types from '../action-types.js'

const defaultState = {
    id: null,
    assets: 'BTC',
    start: '12:31',
    duration: '15',
    comment: 'Comment',
    chart: null,
    forecast: 'up',
    result: 'up',
    summ: '30',
    percent: '60'
}

export const order = (state = defaultState, action) => {
    switch(action.type) {
        case types.CHANGE_FORM_VALUE:
            return { ...state, [action.payload.key]: action.payload.value }
        case types.EDIT_ORDER:
            return { ...state, ...action.payload }
        case types.ADD_ORDER_SUCCESS:
        case types.UPDATE_ORDER_SUCCESS:
        case types.RESET_ORDER:
            return defaultState
        default:
            return state
    }
}
