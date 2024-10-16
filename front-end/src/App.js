import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use Routes and Route
import "./App.css";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";

class App extends Component {
  state = { currentRoute: "all", showCart: false };

  toggleCart = () => {
    this.setState({ ...this.state, showCart: !this.state.showCart });
  };

  handleRouteChange = (route, props) => {
    this.setState({ ...this.state, currentRoute: route });
    props.navigate("/");
  };
  handleClickAway = (event) => {
    if (this.state.showCart && !event.target.closest(".cart-main-container")) {
      this.toggleCart();
    }
  };

  render() {
    console.log(this.state.showCart);
    return (
      <div className="App">
        <BrowserRouter>
          <Header
            onRouteChange={this.handleRouteChange}
            currentRoute={this.state.currentRoute}
            onCartClick={this.toggleCart}
          />
          <div className="main-app-page-container">
            <div
              className={`${this.state.showCart ? "cart-overlay" : ""}`}
              onClick={this.handleClickAway}
              style={{ marginTop: 100 }}
            >
              <div className="main-app-page">
                {this.state.showCart ? <Cart /> : null}
                <Routes>
                  <Route
                    path="/"
                    element={<Home currentRoute={this.state.currentRoute} />}
                  />
                  <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
