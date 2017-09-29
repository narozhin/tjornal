
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as reducers from './reducers'

const reducer = combineReducers({ ...reducers, form: formReducer })

export const store = createStore(reducer)
