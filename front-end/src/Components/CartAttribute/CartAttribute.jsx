import React, { Component } from "react";
import "./Attribute.css";

class CartAttribute extends Component {
  render() {
    const { attrib } = this.props;

    return (
      <div className={`product-details-attrib-${attrib.type}`}>
        <p className="product-details-attrib-title">{attrib.name}</p>
        <ul className="product-details-attrib-items">
          {attrib.items.map((item, index) => (
            <li key={index} className="product-details-attrib-item-container">
              <div
                className="product-details-attrib-item"
                style={{
                  backgroundColor:
                    attrib.id === "Color" ? item.value : "transparent",
                }}
              >
                {attrib.id === "Color" ? "" : item.value}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CartAttribute;
