import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../Redux/CartSlice";
import { fetchProducts } from "../Redux/ProductSlice";
import "../components/Products.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const cartItems = useSelector((state) => state.cart.items);
  const isLoading = useSelector((state) => state.products.loading);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProducts());
    });
  }, [dispatch]);

  const isProductInCart = (product) => {
    if (cartItems && Array.isArray(cartItems)) {
      return cartItems.some((item) => item.id === product.id);
    }
    return false;
  };

  const getCartItemQuantity = (product) => {
    if (cartItems && Array.isArray(cartItems)) {
      const cartItem = cartItems.find((item) => item.id === product.id);
      return cartItem ? cartItem.quantity : 0;
    }
    return 0;
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(decrementQuantity(product));
  };

  return (
    <>
      <h1>Fashion Mall Designs</h1>
      <div className="products">
        {isLoading
          ? Array(10)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="products_conatiner">
                  <div className="product_image">
                    <Skeleton width={200} height={150} />{" "}
                  </div>
                  <div className="product_information">
                    <Skeleton width={150} height={10} />{" "}
                    <Skeleton width={200} height={10} />{" "}
                    <Skeleton width={100} height={10} />{" "}
                  </div>
                  <div className="addcart">
                    <Skeleton width={100} height={20} />{" "}
                  </div>
                </div>
              ))
          : products.map((product) => (
              <div key={product.id} className="products_conatiner">
                <div className="product_image">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt="product" />
                  </Link>
                </div>
                <div className="product_information">
                  <h3>{product.category}</h3>
                  <h4>{product.title}</h4>
                  <h3>${product.price}</h3>
                </div>
                <div className="addcart">
                  {isProductInCart(product) ? (
                    <div className="Quantity_info">
                      <button onClick={() => handleRemoveFromCart(product)}>
                        -
                      </button>
                      {getCartItemQuantity(product)}
                      <button onClick={() => handleAddToCart(product)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Products;
