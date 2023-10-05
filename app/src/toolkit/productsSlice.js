import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = []

export const getProducts = createAsyncThunk("getproducts", async () => {
    const { data } = await axios.get("./products.json")
    return data
})

const productsSlice = createSlice({
    name: 'counter',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
             return action.payload
        })
    }
})

// export const { increment } = counterSlice.actions
export default productsSlice.reducer