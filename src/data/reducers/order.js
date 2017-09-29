import * as types from '../action-types.js'
import moment from 'moment'

const date = moment()

const defaultState = {
    _id: null,
    assets:   { value: '', error: null },
    start:    { value: date.format('HH:mm'), error: null },
    duration: { value: '', error: null },
    comment:  { value: '', error: null },
    forecast: { value: '', error: null },
    result:   { value: '', error: null },
    summ:     { value: '', error: null },
    percent:  { value: '', error: null },
    date:     { value: date.format('DD.MM.YY'), error: null }
}

export const order = (state = defaultState, action) => {
    switch(action.type) {
        case types.CHANGE_FORM_VALUE:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
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
