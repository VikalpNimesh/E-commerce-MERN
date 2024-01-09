import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    product: {},
    productCount:0,
    resultPerPage: null
  },
  reducers: {
    getAllProductsRequest: (state) => {
      state.loading = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.allProducts;
      state.productCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
    getAllProductsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getSingleProductRequest: (state) => {
      state.loading = true;
    },
    getSingleProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      // state.productCount = action.payload.productCount;
    },
    getSingleProductFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFail,
  getSingleProductRequest,
  getSingleProductSuccess,
  getSingleProductFail,
  clearErrors,
} = productSlice.actions;
export default productSlice.reducer;
