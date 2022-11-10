import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems } from './features/cart/cartSlice';
import { useEffect } from 'react';


const App = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((store) => store.cart);
    const { isOpen } = useSelector((store) => store.modal);

    useEffect(() => {
        dispatch(getCartItems('Sachin'));
    }, []);

    if (isLoading) {
        return (
            <div className='loading'>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <main>
            {isOpen && <Modal />}
            <Navbar />
            <CartContainer />
        </main>
    );
};
export default App;
