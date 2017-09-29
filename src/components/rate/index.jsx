import React from 'react'
import { FormField, Row, Col, Glyph, Spinner } from 'elemental'
import style from './style.css'

const getRate = (pair) => fetch(`https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22${pair}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
   .then(response => response.json()).then(data => data.query.results.rate.Rate)

export class Rate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            value: 'Empty',
            pair: props.pair
        }
    }

    componentWillMount() {
        this.state.pair.length && this.updateRate()
    }

    componentWillReceiveProps(nextProps) {
        const needUpdate = this.state.pair !== nextProps.pair
        this.setState({
            pair: nextProps.pair,
            value: nextProps.pair.length ? this.state.value : 'Empty'
        }, () => {
            this.state.pair.length && needUpdate && this.updateRate()
        })
    }

    updateRate() {
        this.setState(
            {
                loading: true
            },
            () => getRate(this.state.pair).then(rate => this.setState({
                value: rate,
                loading: false
            }))
        )
    }

    render() {
        return (
            <Row className="rate-wrapper">
                <Col sm="70%">
                    {this.state.loading
                        ? <Spinner />
                        : this.state.value
                    }
                </Col>
                <Col sm="30%">
                    {this.state.pair.length > 0 && !this.state.loading &&
                        <button onClick={this.updateRate.bind(this)} className="sync-rate" type="button"><Glyph icon="sync"/></button>
                    }
                </Col>
            </Row>
        )
    }
}
