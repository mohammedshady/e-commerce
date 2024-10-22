import React, { Component } from "react";
import "./Attribute.css";

class Attribute extends Component {
  // update item in local storage
  render() {
    const { attrib, cart } = this.props;

    return (
      <div
        className={`${cart ? "minimized-" : ""}product-details-attrib-${
          attrib.type
        }`}
      >
        <p
          className={`${cart ? "minimized-" : ""}product-details-attrib-title`}
        >
          {attrib.name}
        </p>
        <ul
          className={`${cart ? "minimized-" : ""}product-details-attrib-items`}
        >
          {attrib.items.map((item, index) => (
            <li
              key={index}
              className={`${
                cart ? "minimized-" : ""
              }product-details-attrib-item-container ${
                item.selected && cart ? "selected-attribute-item" : ""
              }`}
            >
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

export default Attribute;
