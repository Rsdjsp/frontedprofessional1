import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import productsReducer from "../features/products/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});

export default store;
