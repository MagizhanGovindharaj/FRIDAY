import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from "./Slice";
import reducerToggle from "./Menutoggle"

export const Store = configureStore({
    // devTools:true,
    reducer:{
        questionData: reducerSlice,
        toggleMenu: reducerToggle
    }
})