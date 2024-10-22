import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { withRouter } from "../../WithRouter";
import "./ProductDetails.css";
import parse from "html-react-parser";
import Attribute from "../Attribute/Attribute"; // Import the single Attribute class component
import pointerImage from "../../assets/left-arrow.png";

const GET_PRODUCT = gql`
  query GetItems($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      category
      description
      in_stock
    }
  }
`;

class ProductDetails extends Component {
  state = { currentImage: 0, productDetails: null };

  // Initialize selected var as false for all items
  addSelectedToAttributes = (product) => {
    return {
      ...product,
      attributes: product.attributes.map((attribute) => ({
        ...attribute,
        items: attribute.items.map((item) => ({
          ...item,
          selected: false,
        })),
      })),
    };
  };

  componentDidUpdate(prevProps) {
    const { id } = this.props.params;
    if (prevProps.params.id !== id && this.state.productDetails !== null) {
      this.setState({ productDetails: null });
    }
  }

  hasUnselectedAttributes = () => {
    const { productDetails } = this.state;
    if (!productDetails.attributes || productDetails.attributes.length === 0) {
      return false;
    }
    return productDetails.attributes.some((attribute) =>
      attribute.items.every((item) => !item.selected)
    );
  };

  render() {
    const { id } = this.props.params;

    const imageListClickHandler = (index) => {
      this.setState({ currentImage: index });
    };

    const pointerClickHandler = (sign, total) => {
      this.setState({
        currentImage: (this.state.currentImage + (sign + total)) % total,
      });
    };

    const setAttributeSelected = (attributeId, selectedValue, id) => {
      const updatedAttributes = this.state.productDetails.attributes.map(
        (attribute) => {
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
        }
      );

      this.setState({
        productDetails: {
          ...this.state.productDetails,
          attributes: updatedAttributes,
        },
      });
    };

    return (
      <Query
        query={GET_PRODUCT}
        variables={{ id }}
        onCompleted={(data) => {
          if (!this.state.productDetails) {
            this.setState({
              productDetails: this.addSelectedToAttributes(data.product),
            });
          }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          const product = this.state.productDetails;
          if (!product) return null;

          const hasUnselectedAttributes = this.hasUnselectedAttributes();

          return (
            <div className="product-details-container">
              <div className="product-details-images">
                {product?.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.name}
                    onClick={() => imageListClickHandler(index)}
                    style={
                      index === this.state.currentImage &&
                      product.gallery.length > 1
                        ? { boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }
                        : null
                    }
                  />
                ))}
              </div>
              <div className="prodcut-details-image">
                {product.gallery.length > 1 && (
                  <span
                    className="product-details-image-ctrls-left"
                    onClick={() =>
                      pointerClickHandler(-1, product.gallery.length)
                    }
                  >
                    <img src={pointerImage} alt="leftArrow" />
                  </span>
                )}
                <img
                  src={product.gallery[this.state.currentImage]}
                  alt={product.name}
                />
                {product.gallery.length > 1 && (
                  <span
                    className="product-details-image-ctrls-right"
                    onClick={() =>
                      pointerClickHandler(1, product.gallery.length)
                    }
                  >
                    <img src={pointerImage} alt="rightArrow" />
                  </span>
                )}
              </div>
              <div className="prodcut-details-desc">
                <h1>{product.name}</h1>
                {product.attributes.map((attrib, index) => (
                  <Attribute
                    key={index}
                    attrib={attrib}
                    onItemSelect={setAttributeSelected}
                  />
                ))}

                <div className="product-details-price-container">
                  <p className="product-details-price-title">PRICE: </p>
                  <p className="product-details-price-contents">
                    {product.prices[0].currency.symbol}
                    {product.prices[0].amount}
                  </p>
                </div>

                <button
                  className={`product-details-button${
                    hasUnselectedAttributes ? " disabled-button" : ""
                  }`}
                  disabled={hasUnselectedAttributes}
                  onClick={() => this.props.handleAddToCart(product)}
                >
                  ADD TO CART
                </button>

                <div className="product-details-description">
                  {parse(product.description)}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ProductDetails);
