import {Item} from "../models/Item.ts";
import axios from "axios";
import {createAsyncThunk, createSlice,PayloadAction} from "@reduxjs/toolkit";

export const initialState : Item [] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/item',
    headers:{
        'Content-Type': 'application/json',
    },
});



export const saveItem = createAsyncThunk(
    'item/saveItem',
    async (item:Item)=>{
        try {
            const resp = await api.post('/add',item);
            return resp.data;
        }catch (err){
            return console.error('Error creating item', err);
        }
    }
)


export const getItems = createAsyncThunk(
    'item/getItem',
    async ()=>{
        try {
            const resp = await api.get('/view');
            return resp.data;
        }catch (error){
            return console.log('error',error);
        }
    }
)


export const deleteItem = createAsyncThunk(
    'item/deleteItem',
    async (ItemId:string)=>{
        try {
            const resp = await api.delete(`/delete/${ItemId}`);
            return resp.data;
        }catch (error){
            return console.error('Error deleting item', error);
        }
    }
)

export const UpdateItem =createAsyncThunk(
    'item/updateItem',
    async (item:Item)=>{
        try {
            const resp = await api.put(`/update/${item.ItemID}`,item);
            return resp.data;
        }catch(err){
            return console.log('err',err);
        }
    }
)


// create slice
const itemSlice = createSlice({
    name:'item',
    initialState,
    reducers:{
        addItem(state, action:PayloadAction<Item>){
            state.push(action.payload);
        }
    },
    extraReducers:(builder)=>{
        //add item
        builder
            .addCase(saveItem.fulfilled,(state, action)=>{
                state.push(action.payload);
            })
            .addCase(saveItem.rejected,(state, action)=>{
                console.log("Failed to save item:", action.payload);
            })
            .addCase(saveItem.pending,(state, action)=>{
                console.log("Pending:", action.payload);

            });
        //get all
        builder
            .addCase(getItems.fulfilled, (state, action) => {
                if (Array.isArray(action.payload)) {
                    action.payload.forEach((item: Item) => {
                        state.push(item);
                        console.log(item);
                    });
                } else {
                    console.error("Invalid data received for items:", action.payload);
                }
            })
            .addCase(getItems.pending, (state, action) => {
                console.log("Pending to get item:", action.payload);
            })
            .addCase(getItems.rejected, (state, action) => {
                console.log("Failed to get items:", action.payload);
            });

        //delete items
        builder
            .addCase(deleteItem.rejected, (state, action) => {
                console.log("Reject to delete item:", action.payload);
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                return state = state.filter((item:Item) => item.ItemID !== action.payload.ItemID);

            })
            .addCase(deleteItem.pending, (state, action) => {
                console.log("Pending to delete item:", action.payload);
            })
        //update
        builder
            .addCase(UpdateItem.rejected, (state, action) => {
                console.log("Failed to Updated item:", action.payload);
            })
            .addCase(UpdateItem.fulfilled, (state, action) => {
                const item = state.find((item:Item) => item.ItemID === action.payload.ItemID);
                if (item) {
                    item.Name = action.payload.Name;
                    item.Quantity = action.payload.Quantity;
                    item.Price = action.payload.Price;
                }
            })
            .addCase(UpdateItem.pending, (state, action) => {
                console.log("Pending to Updated item:", action.payload);
            })

    }
})

export const {addItem} = itemSlice.actions;
export default itemSlice.reducer;