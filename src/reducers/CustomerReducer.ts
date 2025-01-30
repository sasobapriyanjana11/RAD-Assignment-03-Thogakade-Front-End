import {Customer} from "../models/Customer.ts";
import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: Customer [] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/customer',
    headers: {
        'Content-Type': 'application/json',
    },

});

export const saveCustomer =createAsyncThunk(
    'customer/saveCustomer',
    async (customer:Customer)=>{
        try {
            const resp = await api.post('/add',customer);
            return resp.data;
        }catch(error){
            return console.log('error',error);
        }
    }
);

export const UpdateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (customer:Customer)=>{
        try {
            const resp = await api.put(`/update/${customer.CustomerID}`,customer);
            return resp.data;
        }catch (error){
            return console.log('error',error);
        }
    }
)

export const getCustomers = createAsyncThunk(
    'customer/getCustomers',
    async ()=>{
        try {
            const resp = await api.get('/view');
            return resp.data;
        }catch (error){
            return console.log('error',error);
        }
    }
)

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (CustomerId:string)=>{
        try {
            const resp = await api.delete(`/delete/${CustomerId}`);
            return resp.data;
        }catch (error){
            console.error('Error deleting customer:', error);
        }
    }
)

//create slice
const customerSlice = createSlice({
    name:'customer',
    initialState,
    reducers:{
        addCustomer(state, action:PayloadAction<Customer>){
            state.push(action.payload);
        }
    },

    extraReducers:(builder) => {
        //add customer
        builder
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.log("Failed to save customer:", action.payload);
            })
            .addCase(saveCustomer.pending, (state, action) => {
                console.log("Pending:",action.payload);
            });
        //update customer
        builder
            .addCase(UpdateCustomer.rejected, (state, action) => {
                console.log("Failed to update customer:", action.payload);
            })
            .addCase(UpdateCustomer.fulfilled, (state, action) => {
                const customer = state.find((customer:Customer) => customer.Email === action.payload.Email);
                if (customer) {
                    customer.Name = action.payload.Name;
                    customer.Address = action.payload.Address;

                }
            })
            .addCase(UpdateCustomer.pending, (state, action) => {
                console.log("Pending to update customer:", action.payload);
            });
        //get all customer
        builder
            .addCase(getCustomers.fulfilled, (state, action) => {
                action.payload.map((customer:Customer) => {
                    state.push(customer);
                })
            })
            .addCase(getCustomers.pending, (state, action) => {
                console.log("Pending to get customer:", action.payload);
            })
            .addCase(getCustomers.rejected, (state, action) => {
                console.log("Rejected to get customer:", action.payload);
            });
        //delete customer
        builder
            .addCase(deleteCustomer.rejected, (state, action) => {
                console.error('Rejected to delete customer:', action.payload);
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                return state = state.filter((customer: Customer) => customer.Email !== action.payload.Email);
            })
            .addCase(deleteCustomer.pending, (state, action) => {
                console.log('Pending to delete customer:', action.payload);
            });
    }
});



export const {addCustomer} = customerSlice.actions;
export default customerSlice.reducer;