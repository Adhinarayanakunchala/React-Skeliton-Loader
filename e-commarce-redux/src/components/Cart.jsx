import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../Redux/CartSlice";
import "../components/Cart.css";
import "../components/CartModel.css";
import { NavLink } from "react-router-dom";
import Emptycart from "../images/emptycart_1.png";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // Access cart items from the Redux store

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleIncrementQuantity = (product) => {
    dispatch(incrementQuantity(product));
  };

  const handleDecrementQuantity = (product) => {
    dispatch(decrementQuantity(product));
  };

  return (
    <div className="cart">
      {cart.length !== 0 ? (
        <div className="cart-model">
          <h1>My Shopping ({cart.length})</h1>
          {cart.map((product) => {
            return (
              <div key={product.id} className="cart-item">
                <div className="cart-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="description">
                  <h2>{product.category}</h2>
                  <h4>{product.title}</h4>
                  <h4>${product.price}</h4>
                  <div className="quantity">
                    <button onClick={() => handleDecrementQuantity(product)}>
                      -
                    </button>
                    {product.quantity}
                    <button onClick={() => handleIncrementQuantity(product)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="remove-btn">
                  <button onClick={() => handleRemoveFromCart(product)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-box">
            <h1>My Cart ({cart.length})</h1>
            <img src={Emptycart} alt="Cart." />
            <NavLink to="/">
              <button type="submit">Shop now</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
