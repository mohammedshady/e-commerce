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
  handleAddToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) productInCart.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(`${product.name} added to cart`);
  }
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
                {this.state.showCart ? (
                  <Cart handleAddToCart={this.handleAddToCart} />
                ) : null}
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        currentRoute={this.state.currentRoute}
                        handleAddToCart={this.handleAddToCart}
                      />
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProductDetails handleAddToCart={this.handleAddToCart} />
                    }
                  />
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
