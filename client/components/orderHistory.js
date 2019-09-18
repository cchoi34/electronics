import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/orderHistory'
import {NavLink} from 'react-router-dom'

const defaultState = {
  orderHistory: []
}

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  async componentDidMount() {
    console.log('this is a test')
    const orderHistory = await this.props.getHistory()
    this.setState(orderHistory)
    console.log(this.state, this.props, orderHistory)
  }
  render() {
    let displayOrders = []
    if (this.props.orderHistory) {
      let displayOrders = this.props.orderHistory.filter(
        order => order.status !== 'inCart'
      )
      displayOrders.sort(function(a, b) {
        a = new Date(a.submissionDate)
        b = new Date(b.subissionDate)
        return a > b ? -1 : a < b ? 1 : 0
      })
    }
    return (
      <div id="orderhistory">
        <hi>Your Order History</hi>
        {displayOrders.length ? (
          <div>
            <h2>No Order History Found!</h2>
          </div>
        ) : (
          <div>
            {displayOrders.map(order => (
              <div id="singleOrder">
                <div />)}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getHistory: () => dispatch(fetchOrderHistory())
})

export default connect(null, mapDispatchToProps)(OrderHistory)