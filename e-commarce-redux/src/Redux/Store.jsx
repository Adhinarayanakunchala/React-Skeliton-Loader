import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; 
import productsReducer from "../Redux/ProductSlice";
import cartReducer from "../Redux/CartSlice";

const Store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: [thunk], 
});

export default Store;
