import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import "./Header.css";
import HeaderLogo from "../../assets/Logo.PNG";
import CartLogo from "../../assets/Cart.PNG";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories
  }
`;

class Header extends Component {
  render() {
    const { currentRoute } = this.props;
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
                    onClick={() => this.props.onRouteChange(route)}
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
        <div className="header-item">
          <img src={CartLogo} width={35} alt="Cart Logo" />
        </div>
      </div>
    );
  }
}

export default Header;
