import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import "./ProductDetails.css";

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
    const { id } = this.props.match.params;

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
                {/* <p>{product.description}</p> */}
                <div className="product-details-attrib-container">
                  {product.attributes.map((attrib, index) => (
                    <div className={`product-details-attrib-${attrib.id}`}>
                      <p className="product-details-attrib-title">
                        {attrib.id}
                      </p>
                      <ul className="product-details-attrib-items">
                        {attrib.items.map((item, index) => (
                          <li
                            key={index}
                            className="product-details-attrib-item-container"
                          >
                            <div
                              className="product-details-attrib-item"
                              style={{
                                backgroundColor:
                                  attrib.id === "Color"
                                    ? item.value
                                    : "transparent",
                              }}
                            >
                              {attrib.id === "Color" ? "" : item.displayValue}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="product-details-price-container">
                  <p className="product-details-price-title">PRICE: </p>
                  <p className="product-details-price-contents">
                    {product.prices[0].currency.symbol}
                    {product.prices[0].amount}
                  </p>
                </div>
                {/* <p>Category: {product.category}</p>
                <p>In Stock: {product.in_stock ? "Yes" : "No"}</p> */}
                <button className="product-details-button">ADD TO CART</button>
                {/* <p>{product.description}</p> */}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductDetails;
