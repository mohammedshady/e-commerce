import React, { Component } from "react";
import "./Home.css";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const GET_ITEMS = gql`
  query GetItems {
    products(category: "all") {
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

class Home extends Component {
  handleItemClick = (id) => {
    this.props.history.push(`/product/${id}`);
  };

  render() {
    return (
      <div className="home-container">
        <h1 className="home-title-h1">Women</h1>
        <Query query={GET_ITEMS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <div className="product-list-container">
                {data.products.map((product) => (
                  <div
                    className="product-list-item"
                    key={product.id}
                    onClick={() => this.handleItemClick(product.id)} // Call the click handler
                  >
                    <img src={product.gallery[0]} alt={product.name} />
                    <div className="product-list-item-desc">
                      <p className="product-list-item-name">{product.name}</p>
                      <p className="product-list-item-price">
                        {product.prices[0].currency.symbol}{" "}
                        {product.prices[0].amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(Home);
