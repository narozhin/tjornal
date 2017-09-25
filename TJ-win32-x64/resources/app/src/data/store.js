
import { createStore, combineReducers } from 'redux'
import * as reducers from './reducers'

const reducer = combineReducers({ ...reducers })

export const store = createStore(reducer)
