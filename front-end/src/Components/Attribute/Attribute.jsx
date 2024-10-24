import React, { Component } from "react";
import "./Attribute.css";

function toKebabCase(str) {
  return str
    .trim() // Remove leading and trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/[^\w-]+/g, "") // Remove any non-word characters except hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove hyphens from the start and end
}
class Attribute extends Component {
  getItemStyle = (attrib, item) => {
    return {
      backgroundColor: attrib.id === "Color" ? item.value : "transparent",
    };
  };

  render() {
    const { attrib, cart } = this.props;
    const isMinimized = cart ? "minimized-" : "";
    const id = cart && this.props.uid;

    return (
      <div
        className={`${isMinimized}product-details-attrib-${attrib.type}`}
        data-testid={
          cart
            ? `cart-item-attribute-${toKebabCase(attrib.name)}`
            : `product-attribute-${toKebabCase(attrib.name)}`
        }
      >
        <p className={`${isMinimized}product-details-attrib-title`}>
          {attrib.name}
        </p>
        <ul className={`${isMinimized}product-details-attrib-items`}>
          {attrib.items.map((item, index) => (
            <li
              key={index}
              className={`${isMinimized}product-details-attrib-item-container ${
                item.selected ? "selected-attribute-item" : ""
              }`}
            >
              <div
                className="product-details-attrib-item"
                data-testid={
                  cart
                    ? item.selected
                      ? `cart-item-attribute-${toKebabCase(
                          attrib.name
                        )}-${toKebabCase(attrib.name)}-selected`
                      : `cart-item-attribute-${toKebabCase(
                          attrib.name
                        )}-${toKebabCase(attrib.name)}`
                    : ""
                }
                style={this.getItemStyle(attrib, item)}
                onClick={() =>
                  this.props.onItemSelect(attrib.name, item.value, id)
                }
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
