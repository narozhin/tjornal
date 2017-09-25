import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './data'
import { App } from './App.jsx'

class Main extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

render(<Main/>, document.getElementById('root'))
