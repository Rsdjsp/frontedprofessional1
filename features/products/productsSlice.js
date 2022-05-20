import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../config/axios";



export const products = createAsyncThunk("products/all", async () => {
    const response = await get("/products");
    return response.data.docs;
});

const productsSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        error: false,
        products: [],
        carousel: [],
        bestSellers: [],
        offers: [],
        newCollection: [],
        liquidation: [],
    },

    extraReducers(builder) {
        builder
            .addCase(products.pending, (state) => {
                state.loading = true;
            })
            .addCase(products.rejected, (state) => {
                state.error = true;
            })
            .addCase(products.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.carousel = action.payload.slice(0, 20);
                state.bestSellers = action.payload.slice(0, 32);
                state.offers = action.payload.slice(32, 64);
                state.newCollection = action.payload.slice(64, 96);
                state.liquidation = action.payload.slice(96, 128);
            });
    },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
