import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import "./Header.css";
import HeaderLogo from "../../assets/Logo.PNG";
import CartLogo from "../../assets/Cart.PNG";
import { withRouter } from "../../WithRouter";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories
  }
`;

class Header extends Component {
  render() {
    const { onRouteChange, currentRoute, onCartClick } = this.props;
    return (
      <div className="header-container">
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const routes = data.categories;

            return (
              <ul className="border">
                {routes.map((route) => (
                  <li
                    className={currentRoute === route ? "active-route" : ""}
                    key={route}
                    onClick={() => onRouteChange(route, this.props)}
                  >
                    {route}
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>

        <div className="header-item">
          <img src={HeaderLogo} width={30} alt="Header Logo" />
        </div>
        <div className="header-item" onClick={onCartClick}>
          <img src={CartLogo} width={35} alt="Cart Logo" />
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
