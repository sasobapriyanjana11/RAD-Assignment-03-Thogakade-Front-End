import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducers/CustomerReducer";
import itemReducer from "../reducers/ItemReducer.ts";

export const store = configureStore({
    reducer :{
        customer : customerReducer,
        item:itemReducer,
    }
})
export type AppDispatch = typeof store.dispatch