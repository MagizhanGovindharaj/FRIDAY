import { createSlice } from "@reduxjs/toolkit";

let initialState = {
}
const Slice = createSlice({
    name:"questionData",
    initialState,
    reducers: {
        addQuestion(state,action){
            console.log(action);
            state[action.payload]=" ..."
        },
        addresult(state,action){
            console.log(action);
            state[action.payload.text]=action.payload.response;
        }
    }
})

export const {addQuestion,addresult} = Slice.actions
export default Slice.reducer