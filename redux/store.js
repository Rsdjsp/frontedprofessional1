import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import cartReducer from "../features/products/cart";



const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: authReducer,
  },
});

export default store;
