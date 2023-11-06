import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Redux/ProductSlice";
import { Link, useParams } from "react-router-dom";
import "../components/Product.css";
import { addToCart, decrementQuantity } from "../Redux/CartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.data);
  const cartItems = useSelector((state) => state.cart.items);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  // const isProductInCart = (product) => {
  //   return cartItems.some((item) => item.id === product.id);
  // };

  const getCartItemQuantity = (product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(decrementQuantity(product));
  };

  return (
    <>
      <h1>Product Details</h1>
      <button className="back_btn">
        {" "}
        <Link to="/">Back</Link>
      </button>
      <div className="pdt">
        {product.map((pdt) => (
          <div key={pdt.id} className="pdt_container">
            <div className="pdt_image">
              <img src={pdt.image} alt="product" />
            </div>
            <div className="pdt_info">
              <h3>{pdt.category}</h3>
              <h2>{pdt.title}</h2>
              <p>{pdt.description}</p>
              <h3>${pdt.price}</h3>

              <div className="addcart_btns">
                <div className="Quantitys">
                  <button onClick={() => handleRemoveFromCart(pdt)}>-</button>
                  {getCartItemQuantity(pdt)}
                  <button onClick={() => handleAddToCart(pdt)}>+</button>
                </div>
                <div className="add_cart">
                  <button onClick={() => handleAddToCart(pdt)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
