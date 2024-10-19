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
  state = { currentImage: 0, productDetails: {} };
  render() {
    const { id } = this.props.params;
    const imageListClickHandler = (index) => {
      this.setState({ ...this.state, currentImage: index });
    };
    const pointerClickHandler = (sign, total) => {
      this.setState({
        ...this.state,
        currentImage: (this.state.currentImage + (sign + total)) % total,
      });
    };

    return (
      <Query query={GET_PRODUCT} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          const product = data.product;

          return (
            <div className="product-details-container">
              <div className="product-details-images">
                {product.gallery.map((image, index) => (
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

                {/* Render each attribute using the Attribute class component */}
                {product.attributes.map((attrib, index) => (
                  <Attribute key={index} attrib={attrib} />
                ))}

                <div className="product-details-price-container">
                  <p className="product-details-price-title">PRICE: </p>
                  <p className="product-details-price-contents">
                    {product.prices[0].currency.symbol}
                    {product.prices[0].amount}
                  </p>
                </div>
                <button className="product-details-button">ADD TO CART</button>
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
