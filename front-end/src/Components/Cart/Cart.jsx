import React, { Component } from "react";
import "./Cart.css";
import Attribute from "../Attribute/Attribute";

const item = {
  id: "apple-imac-2021",
  name: "iMac 2021",
  gallery: [
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000",
  ],
  prices: [
    {
      amount: "1688.03",
      currency: {
        label: "USD",
        symbol: "$",
      },
    },
  ],
  attributes: [
    {
      id: "Capacity",
      name: "Capacity",
      type: "text",
      items: [
        {
          id: "512GB",
          displayValue: "512GB",
          value: "512GB",
        },
        {
          id: "256GB",
          displayValue: "256GB",
          value: "256GB",
        },
      ],
    },
    {
      id: "Touch ID in keyboard",
      name: "Touch ID in keyboard",
      type: "text",
      items: [
        {
          id: "No",
          displayValue: "No",
          value: "No",
        },
        {
          id: "Yes",
          displayValue: "Yes",
          value: "Yes",
        },
      ],
    },
    {
      id: "With USB 3 ports",
      name: "With USB 3 ports",
      type: "text",
      items: [
        {
          id: "No",
          displayValue: "No",
          value: "No",
        },
        {
          id: "Yes",
          displayValue: "Yes",
          value: "Yes",
        },
      ],
    },
  ],
  category: "tech",
  description: "The new iMac!",
  in_stock: true,
};
class Cart extends Component {
  render() {
    return (
      <div className="cart-main-container">
        <div>My Bag 3 items</div>
        <div className="cart-item-container">
          <div className="cart-item-attribures">
            <p>{item.name}</p>
            <p>{item.prices[0].currency.symbol + item.prices[0].amount}</p>
            {item.attributes.map((attrib) => (
              <Attribute attrib={attrib} />
            ))}
          </div>
          <div className="cart-item-controls"></div>
          <img className="cart-item-img" alt="cart-item-img"></img>
        </div>
        <div>
          <span>Total</span>
          <span>$200.00</span>
        </div>
        <button>Place Order</button>
      </div>
    );
  }
}

export default Cart;
