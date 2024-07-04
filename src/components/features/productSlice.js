import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../Products";

const productSlice=createSlice({
    name:"products",
    initialState:{
        items:Products,
        status:null
    },
    reducers:{}
}
   
)

export default productSlice.reducer