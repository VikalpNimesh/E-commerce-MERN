import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },

  reducers: {
    getAllProduct: (state, action) => (state.product = action.payload.product),
  },
});

export const { getAllProduct } = userSlice.actions;

export default userSlice.reducer;
