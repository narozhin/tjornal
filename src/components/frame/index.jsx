import React from 'react'
import style from './style.css'

export class WindowFrame extends React.Component {

    onClickClose() {
        window.remote.getCurrentWindow().close()
    }

    onClickMin() {
        window.remote.getCurrentWindow().minimize()
    }

    render() {
        return (
            <div className="frame-wrapper">
                <span className="frame-title">
                    <i>TJournal</i>
                </span>
                <button onClick={this.onClickMin} className="frame-button min" type="button"></button>
                <button onClick={this.onClickClose} className="frame-button close" type="button" />
            </div>
        )
    }
}
