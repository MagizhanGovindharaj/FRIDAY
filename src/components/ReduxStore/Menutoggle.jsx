import { createSlice } from "@reduxjs/toolkit";

let initialState = true;

const Menutoggle = createSlice({
    name:"toggleMenu",
    initialState,
    reducers: {
        toggle(state,action){
            return action.payload;
        },
    }
})


export const {toggle} = Menutoggle.actions
export default Menutoggle.reducer