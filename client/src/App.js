import _ from "lodash";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import HomeWithParams from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";

class App extends Component {
  state = {
    showCart: false,
    cartItems: [],
  };
  componentDidMount() {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    this.setState({ cartItems: storedItems });
  }
  handleRouteChange = (route, props) => {
    this.setState({ ...this.state, currentRoute: route });
    props.navigate("/");
  };
  handleClickAway = (event) => {
    if (this.state.showCart && !event.target.closest(".cart-main-container")) {
      this.toggleCart();
    }
  };
  toggleCart = () => {
    this.setState({ showCart: !this.state.showCart });
  };

  handleAddToCart = (product) => {
    let cart = [...this.state.cartItems];
    const productInCart = cart.find(
      (item) =>
        item.id === product.id && _.isEqual(item.attributes, product.attributes)
    );

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, uid: uuidv4() });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cartItems: cart });
    console.log(`${product.name} added to cart`);
  };

  handleRemoveFromCart = (uid) => {
    let cart = [...this.state.cartItems];
    const productInCart = cart.find((item) => item.uid === uid);

    if (productInCart) {
      productInCart.quantity -= 1;
      if (productInCart.quantity <= 0) {
        cart = cart.filter((item) => item.uid !== uid);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState({ cartItems: cart });
      console.log(`Product with uid ${uid} removed from cart`);
    }
  };

  handleClearCart = () => {
    this.setState({ ...this.state, cartItems: [] });
    localStorage.setItem("cart", JSON.stringify([]));
    console.log("All items removed from cart");
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header
            onCartClick={this.toggleCart}
            cartVisible={this.state.showCart}
            cartSize={this.state.cartItems.length}
          />
          <div className="main-app-page-container">
            <div
              className={`${this.state.showCart ? "cart-overlay" : ""}`}
              onClick={this.handleClickAway}
            >
              <div className="main-app-page">
                {this.state.showCart && (
                  <Cart
                    state={this.state}
                    handleAddToCart={this.handleAddToCart}
                    handleRemoveFromCart={this.handleRemoveFromCart}
                    handleClearCart={this.handleClearCart}
                  />
                )}
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HomeWithParams handleAddToCart={this.handleAddToCart} />
                    }
                  />
                  <Route
                    path="/:category"
                    element={
                      <HomeWithParams handleAddToCart={this.handleAddToCart} />
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProductDetails
                        handleAddToCart={this.handleAddToCart}
                        toggleCart={this.toggleCart}
                      />
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
