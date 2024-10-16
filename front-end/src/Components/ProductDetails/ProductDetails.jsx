import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { withRouter } from "../../WithRouter";
import "./ProductDetails.css";
import parse from "html-react-parser";
import Attribute from "../Attribute/Attribute"; // Import the single Attribute class component

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
  render() {
    const { id } = this.props.params;
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
                  <img key={index} src={image} alt={product.name} />
                ))}
              </div>
              <div className="prodcut-details-image">
                <span className="product-details-image-ctrls-right"></span>
                <img src={product.gallery[0]} alt={product.name} />
                <span className="product-details-image-ctrls-left"></span>
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
