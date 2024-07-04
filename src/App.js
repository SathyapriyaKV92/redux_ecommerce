
import './App.css';
import {Route } from 'react-router';
import {Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
    <ToastContainer/>
    <NavBar />
    <Routes>
      <Route path='/'  exact element={<Home />}></Route>
      <Route path='/cart' element={<Cart />} />
    </Routes>
    
    </>
  );
}

export default App;
