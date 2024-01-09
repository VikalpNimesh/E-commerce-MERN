import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice.js";

const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
  },
});

export default store;
