import React, { Component } from "react";
import "./Home.css";
import { Query } from "@apollo/client/react/components";
import { GET_ITEMS } from "../../graphql/queries";
import { withRouter } from "../../WithRouter";
import cartIcon from "../../assets/CartW.svg";
import { useParams } from "react-router-dom";
import { toKebabCase } from "../../helpers/toKebabCase";

class Home extends Component {
  constructor() {
    super();
    this.handleProductClick = this.handleProductClick.bind(this);
  }
  selectProductAttributes(product) {
    product = JSON.parse(JSON.stringify(product));
    product.attributes.forEach((attribute) => {
      attribute.items.forEach((item, index) => {
        item.selected = index === 0;
      });
    });
    return product;
  }
  handleProductClick(id) {
    this.props.navigate(`/product/${id}`);
  }
  handleAddToCartClick(product, event) {
    event.stopPropagation();
    this.props.handleAddToCart(this.selectProductAttributes(product));
  }

  render() {
    const { category } = this.props;
    return (
      <div className="home-container">
        <h1 className="home-title-h1">{category}</h1>
        <Query query={GET_ITEMS} variables={{ category }}>
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
                    style={!product.in_stock ? { opacity: 0.5 } : null}
                    data-testid={`product-${toKebabCase(product.name)}`}
                  >
                    {!product.in_stock ? (
                      <p className="product-item-props">OUT OF STOCK</p>
                    ) : (
                      <div
                        className="quick-cart-container"
                        onClick={(event) =>
                          this.handleAddToCartClick(product, event)
                        }
                      >
                        <img
                          style={{ width: 35 }}
                          src={cartIcon}
                          alt="cartIcon"
                        />
                      </div>
                    )}
                    <div>
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

function HomeWithParams(props) {
  const { category } = useParams();
  return <Home {...props} category={category || "all"} />;
}
export default withRouter(HomeWithParams);
