import React, { Component } from "react";
import "./Cart.css";
import gql from "graphql-tag";
import { Mutation } from "@apollo/client/react/components";
import AddIcon from "../../assets/plus.png";
import RemoveIcon from "../../assets/minus.png";
import Attribute from "../Attribute/Attribute";

const ADD_ORDER = gql`
  mutation AddOrder($items: [ItemInput!]!, $price: Float!) {
    addOrder(items: $items, price: $price)
  }
`;

class Cart extends Component {
  handlePrepareOrder = () => {
    const items = this.props.state?.cartItems;
    const totalPrice = items.reduce((acc, item) => {
      return acc + parseFloat(item.prices?.[0]?.amount * item.quantity || 0);
    }, 0);

    const placedOrders = items.map((item, index) => {
      const productAttributes = item.attributes.map((attribute) => {
        const selectedItem = attribute.items.find(
          (attrItem) => attrItem.selected
        );
        return {
          name: attribute.name,
          value: selectedItem.value,
        };
      });

      return {
        product: item.id,
        quantity: item.quantity,
        attributes: productAttributes,
        price: parseFloat(item.prices[0].amount),
      };
    });

    return { items: placedOrders, price: totalPrice };
  };

  render() {
    const items = this.props.state?.cartItems;
    const totalPrice = items.reduce((acc, item) => {
      return acc + parseFloat(item.prices?.[0]?.amount * item.quantity || 0);
    }, 0);

    return (
      <div className="cart-main-container" data-testid="cart-overlay">
        <h3 className="cart-main-header">
          My Bag,
          {items.length > 1 ? `${items.length} Items` : `${items.length} Item`}
        </h3>
        {items.map((item, index) => (
          <div className="cart-item-container" key={index}>
            <div className="cart-item-attribures">
              <p className="cart-item-attribures-primary">{item.name}</p>
              <p className="cart-item-attribures-secondary">
                {item.prices?.[0]?.currency?.symbol +
                  item.prices?.[0]?.amount || "N/A"}
              </p>
              {item.attributes?.map((attrib, attribIndex) => (
                <Attribute
                  attrib={attrib}
                  cart
                  key={attribIndex}
                  uid={item.uid}
                />
              ))}
            </div>
            <div className="cart-item-controls">
              <button
                onClick={() => this.props.handleAddToCart(item)}
                data-testid="cart-item-amount-increase"
              >
                <img src={AddIcon} alt="addIcon" width={20} />
              </button>
              <p data-testid="cart-item-amount">{item.quantity}</p>
              <button
                onClick={() => this.props.handleRemoveFromCart(item.uid)}
                data-testid="cart-item-amount-decrease"
              >
                <img src={RemoveIcon} alt="RemoveIcon" width={20} />
              </button>
            </div>
            <img
              className="cart-item-img"
              src={item.gallery?.[0] || "default-image-url.jpg"}
              alt="cart-item-img"
            />
          </div>
        ))}

        <div className="cart-total-container">
          <span>Total</span>
          <span data-testid="cart-total">
            {parseFloat(totalPrice.toFixed(2))}
          </span>
        </div>

        <Mutation mutation={ADD_ORDER}>
          {(addOrder, { data, loading, error }) => (
            <div>
              <button
                onClick={() => {
                  const order = this.handlePrepareOrder();
                  addOrder({
                    variables: {
                      items: order.items,
                      price: order.price,
                    },
                  })
                    .then(() => {
                      this.props.handleClearCart();
                    })
                    .catch((err) => {
                      console.error("Error placing order:", err);
                    });
                }}
                className={`cart-total-button ${
                  items.length === 0 ? "disabled-button" : ""
                }`}
                disabled={items.length === 0}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              {error && <p>Error: {error.message}</p>}
              {data && (
                <p>
                  Order placed successfully! Your Order ID Is {data.addOrder}
                </p>
              )}
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Cart;
