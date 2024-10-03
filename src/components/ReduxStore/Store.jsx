import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from "./Slice";

export const Store = configureStore({
    // devTools:true,
    reducer:{
        questionData: reducerSlice
    }
})