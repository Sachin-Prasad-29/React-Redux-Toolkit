import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';
import axios from 'axios';


const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
    console.log(name);
    console.log(thunkAPI.getState());
    try {
        const res = await axios(url);
        console.log(res);
        
        return res.data;
    } catch (error) {
        console.log(error);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const newCart = state.cartItems.filter((item) => {
                return item.id !== action.payload.id;
            });
            state.cartItems = newCart;
        },
        toggleAmount: (state, action) => {
            state.cartItems.map((item) => {
                if (item.id === action.payload.id) {
                    if (action.payload.toggle === 'inc') {
                        return (item.amount = item.amount + 1);
                    }
                    if (action.payload.toggle === 'dec') {
                        return (item.amount = item.amount - 1);
                    }
                }
            });
        },
        calculateTotals: (state) => {
            let newTotal = state.cartItems.reduce(
                (data, item) => {
                    const { price, amount } = item;
                    data.amount += amount;
                    data.total += parseFloat(price) * parseFloat(amount);
                    return data;
                },
                { total: 0, amount: 0 }
            );
            state.total = newTotal.total.toFixed(2);
            state.amount = newTotal.amount;
        },
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

// console.log(cartSlice)
export const { clearCart, removeItem, increase, decrease, toggleAmount, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
