import React, { Component } from "react";
import "./Header.css";
import HeaderLogo from "../../assets/Logo.PNG";
import CartLogo from "../../assets/Cart.PNG";

const routes = ["Men", "Women", "Kids"];

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <ul className="border">
          {routes.map((route) => (
            <li key={route}>{route}</li>
          ))}
        </ul>
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
