import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"; // Use Switch and Route
import "./App.css";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

class App extends Component {
  state = { currentRoute: "all" };
  handleRouteChange = (route) => {
    this.setState({ currentRoute: route });
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header
            onRouteChange={this.handleRouteChange}
            currentRoute={this.state.currentRoute}
          />
          <div className="main-app-page">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home {...props} currentRoute={this.state.currentRoute} />
                )}
              />
              <Route path="/product/:id" component={ProductDetails} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
