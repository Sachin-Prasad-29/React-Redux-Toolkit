import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';

const Model = () => {
    const dispatch = useDispatch();
    return (
        <aside className='modal-container'>
            <div className='modal'>
                <h4>Remove all items fro your shopping cart ?</h4>
                <div className='btn-container'>
                    <button
                        className='btn confirm-btn'
                        onClick={() => {
                            dispatch(clearCart());
                            dispatch(closeModal())
                        }}
                    >
                        confirm
                    </button>
                    <button
                        className='btn clear-btn'
                        onClick={() => {
                            dispatch(closeModal());
                            
                        }}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Model;
