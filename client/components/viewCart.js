import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class ViewCart extends React.Component {
  render() {
    const items = this.props.cart.items
    return (
      <div id="cart-side-bar">
        <div className="cart-header">
          <p>Subtotal: $0.00</p>
          <button className="checkout">Proceed to Checkout</button>
        </div>
        {items ? (
          items.map(item => (
            <div key={item.id} className="wrap">
              <img src={item.photo} className="itemPhoto" />
              <ul>
                <li>Price: {item.price}</li>
                <li>Name:{item.name}</li>
              </ul>
            </div>
          ))
        ) : (
          <div>
            <p>Your Cart Is Currently Empty</p>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

export default withRouter(connect(mapState)(ViewCart))
