import React from "react";

import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
function App() {
  return (
    <>
      <Provider store={Store}>
        <Router>
          <Routes>
            <Route
              path="/checkout"
              element={
                <>
                  <Header />
                  <Cart />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Products />
                </>
              }
            />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
