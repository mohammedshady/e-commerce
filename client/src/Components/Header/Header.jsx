import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import "./Header.css";
import HeaderLogo from "../../assets/Logo.svg";
import CartLogo from "../../assets/Cart.svg";
import { withRouter } from "../../WithRouter";
import { Link } from "react-router-dom";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories
  }
`;

class Header extends Component {
  handleHeaderNavClick = (category) => {
    this.props.navigate(`/${category}`);
    if (this.props.cartVisible) this.props.onCartClick();
  };

  render() {
    const { onCartClick, cartSize } = this.props;
    const route =
      window.location.pathname.length > 1 ? window.location.pathname : "/all";
    return (
      <div className="header-container">
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <p className="header-item">Loading...</p>;
            if (error)
              return <p className="header-item">Error: {error.message}</p>;

            return (
              <ul className="border">
                {data.categories.map((category) => (
                  <li
                    key={category}
                    className={route === "/" + category ? "active-route" : ""}
                    onClick={() => this.handleHeaderNavClick(category)}
                  >
                    <Link
                      data-testid={
                        route === "/" + category
                          ? `active-category-link`
                          : `category-link`
                      }
                      to={`/${category}`}
                      className="category-link"
                      style={{
                        textDecoration: "none",
                        color: "var(--text-primary)",
                      }}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>

        <div className="header-item">
          <img src={HeaderLogo} width={40} alt="Header Logo" />
        </div>
        <div className="header-item">
          <button
            data-testid="cart-btn"
            className="cart-logo-container"
            onClick={onCartClick}
          >
            <img src={CartLogo} width={28} alt="Cart Logo" />
            {cartSize > 0 ? (
              <div className="cart-item-counter">{cartSize}</div>
            ) : null}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
