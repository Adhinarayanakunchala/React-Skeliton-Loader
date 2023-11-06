import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/apiURL";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;
      state.data = [action.payload];
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
} = ProductSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsRequest());
    const res = await axios.get(BASE_URL+"products");
    dispatch(fetchProductsSuccess(res.data));
  } catch (err) {
    dispatch(fetchProductsFailure(err.message));
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch(fetchProductRequest());
    const res = await axios.get(BASE_URL+`products/${id}`);
    dispatch(fetchProductSuccess(res.data));
  } catch (err) {
    dispatch(fetchProductFailure(err.message));
  }
};

export default ProductSlice.reducer;
