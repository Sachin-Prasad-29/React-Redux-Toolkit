import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import { useSelector } from 'react-redux';


const App = () => {
    const {isOpen}  = useSelector((store) => store.modal)
    return (
        <main>
            {isOpen && <Modal />}
            <Navbar />
            <CartContainer />
        </main>
    );
};
export default App;
