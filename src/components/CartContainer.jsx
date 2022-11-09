import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from '../features/cart/cartSlice';
import { openModal } from '../features/modal/modalSlice';
import { useEffect } from 'react';

const CartContainer = () => {
    const dispatch = useDispatch();
    const { cartItems, total, amount } = useSelector((store) => store.cart);

    useEffect(() => {
      dispatch(calculateTotals());
    },[cartItems])
    
    if (amount < 1) {
        return (
            <section className='cart'>
                <header>
                    <h2>your bag</h2>
                    <h4 className='empty-cart'>is Currently empty</h4>
                </header>
            </section>
        );
    }
    return (
        <section className='cart'>
            <header>
                <h2>Your Bag</h2>
            </header>
            <div>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}
            </div>
            <footer>
                <hr />
                <div className='cart-total'>
                    <h4>
                        Total <span>${total}</span>
                    </h4>
                </div>
                <button className='btn clear-btn' onClick={() => dispatch(openModal())}>
                    Clear cart
                </button>
            </footer>
        </section>
    );
};

export default CartContainer;
