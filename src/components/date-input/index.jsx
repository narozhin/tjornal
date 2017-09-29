import React from 'react'
import { RFormInput } from '..'
import DatePicker from 'react-datepicker'

export class DateInput extends React.Component {

    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }

    handleSelectDate (date) {
        this.props.input.onChange(
            date.format('DD.MM.YY')
        )
        this.toggleCalendar()
    }

    toggleCalendar (e) {
        e && e.preventDefault()
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <div>
                <RFormInput {...this.props} onClick={this.toggleCalendar.bind(this)}  />
                {
                    this.state.isOpen &&
                    <DatePicker
                        onChange={this.handleSelectDate.bind(this)}
                        withPortal
                        inline
                    />
                }
            </div>
        )
    }
}
