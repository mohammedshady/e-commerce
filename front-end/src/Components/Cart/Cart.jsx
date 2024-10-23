import React, { Component } from "react";
import "./Cart.css";
import AddIcon from "../../assets/plus.png";
import RemoveIcon from "../../assets/minus.png";
import Attribute from "../Attribute/Attribute";

class Cart extends Component {
  render() {
    const items = this.props.state?.cartItems;
    const totalPrice = items.reduce((acc, item) => {
      return acc + parseFloat(item.prices?.[0]?.amount * item.quantity || 0);
    }, 0);

    // to be moved
    const setAttributeSelected = (item, attributeId, selectedValue) => {
      const updatedAttributes = item.attributes.map((attribute) => {
        if (attribute.id === attributeId) {
          return {
            ...attribute,
            items: attribute.items.map((item) => ({
              ...item,
              selected: item.value === selectedValue,
            })),
          };
        }
        return attribute;
      });
      return updatedAttributes;
    };
    const onItemSelect = (attribute, selectedValue, uid) => {
      const product = items.find((item) => item.uid === uid);
      const updatedAttributes = setAttributeSelected(
        product,
        attribute,
        selectedValue
      );
      product.attributes = updatedAttributes;

      this.props.handleStateChange(items);
    };

    const handlePlaceOrder = () => {
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
          index: index,
          name: item.id,
          quantity: item.quantity,
          attributes: productAttributes,
        };
      });

      console.log(placedOrders);
    };

    return (
      <div className="cart-main-container">
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
                  onItemSelect={onItemSelect}
                />
              ))}
            </div>
            <div className="cart-item-controls">
              <div onClick={() => this.props.handleAddToCart(item)}>
                <img src={AddIcon} alt="addIcon" width={20} />
              </div>
              <p>{item.quantity}</p>
              <div onClick={() => this.props.handleRemoveFromCart(item.uid)}>
                <img src={RemoveIcon} alt="RemoveIcon" width={20} />
              </div>
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
          <span>{parseFloat(totalPrice.toFixed(2))}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className={`cart-total-button ${
            items.length == 0 ? "disabled-button" : ""
          }`}
        >
          Place Order
        </button>
      </div>
    );
  }
}

export default Cart;
