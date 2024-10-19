import React, { Component } from "react";
import "./Home.css";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { withRouter } from "../../WithRouter";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const GET_ITEMS = gql`
  query GetItems($category: String!) {
    products(category: $category) {
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
      category
      in_stock
    }
  }
`;

class Home extends Component {
  constructor() {
    super();
    this.handleProductClick = this.handleProductClick.bind(this);
  }

  handleProductClick(id) {
    this.props.navigate(`/product/${id}`);
  }

  render() {
    return (
      <div className="home-container">
        <h1 className="home-title-h1">{this.props.currentRoute}</h1>
        <Query
          query={GET_ITEMS}
          variables={{ category: this.props.currentRoute }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <div className="product-list-container">
                {data.products.map((product) => (
                  <div
                    className="product-list-item"
                    key={product.id}
                    onClick={() => this.handleProductClick(product.id)}
                  >
                    <div
                      className="product-list-item-overlay"
                      style={!product.in_stock ? { opacity: 0.5 } : null}
                    >
                      {!product.in_stock ? (
                        <p>OUT OF STOCK</p>
                      ) : (
                        <div>
                          <ShoppingCartOutlinedIcon
                            sx={{ color: "white", fontSize: 28 }}
                          />
                        </div>
                      )}
                      <img src={product.gallery[0]} alt={product.name} />
                    </div>
                    <div className="product-list-item-desc">
                      <p className="product-list-item-name">{product.name}</p>
                      <p
                        className="product-list-item-price"
                        style={!product.in_stock ? { opacity: 0.5 } : null}
                      >
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
