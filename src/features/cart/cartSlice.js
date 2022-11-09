import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';
import { useDispatch } from 'react-redux';
import { closeModal } from '../modal/modalSlice';

const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
};
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
        // increase: (state, action) => {
        //     state.cartItems.map((item) => {
        //         if (item.id === action.payload.id) {
        //             return (item.amount = item.amount + 1);
        //         }
        //     });
        // },
        // decrease: (state, action) => {
        //     state.cartItems.map((item) => {
        //         if (item.id === action.payload.id) {
        //             return (item.amount = item.amount - 1);
        //         }
        //     });
        // },
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
            let newTotal = state.cartItems.reduce((data, item) => {
                const {price,amount} = item;
                data.amount += amount;
                data.total += parseFloat(price) * parseFloat(amount);
                return data;
            }, {total:0,amount:0});
            state.total =  newTotal.total.toFixed(2);
            state.amount = newTotal.amount;
        },
    },
});

// console.log(cartSlice)
export const { clearCart, removeItem, increase, decrease, toggleAmount, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
