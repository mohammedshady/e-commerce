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
  render() {
    const { onRouteChange, currentRoute, onCartClick, cartSize, cartVisible } =
      this.props;
    return (
      <div className="header-container">
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <p className="header-item">Loading...</p>;
            if (error)
              return <p className="header-item">Error: {error.message}</p>;
            const routes = data.categories;

            return (
              <ul className="border">
                {routes.map((route) => (
                  <li
                    className={currentRoute === route ? "active-route" : ""}
                    key={route}
                    onClick={() => {
                      onRouteChange(route, this.props);
                      if (cartVisible) onCartClick();
                    }}
                  >
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "var(--text-primary)",
                      }}
                      data-testid={`${
                        currentRoute === route
                          ? "active-category-link"
                          : "category-link"
                      }`}
                    >
                      {route}
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
