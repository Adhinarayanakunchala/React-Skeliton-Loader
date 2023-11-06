import React from "react";
import Shoppingimage from "../images/Shoppingimage.jpg";
import { FaCartArrowDown } from "react-icons/fa";
import "./Header.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const cart = useSelector((state) => state.cart.items);
  return (
    <div className="header">
      <img src={Shoppingimage} alt="ShoppingCart" />
      <div className="cartcount">
        <NavLink
          to="/checkout"
          style={{ textDecoration: "none", color: "#ffff" }}
        >
          <span>{cart.length}</span>
          <FaCartArrowDown />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
