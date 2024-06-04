import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from './Components/Products/ProductDetails';
import Cart from './Pages/Cart';
import GoogleAuthCallback from './Pages/GoogleAuthCallback';
import Login from './Pages/Login';
import { useDispatch } from 'react-redux';
import { userReducer } from './store/UserSlice';
import { productReducer } from './store/ProductsSlice';
import axios from 'axios';
import { useLayoutEffect} from 'react';                    

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    if(cartItems) {
      dispatch(productReducer.loadItemsToCart(cartItems));
    }
    if(token) {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      dispatch(userReducer.loadUserInfo({token,info:userInfo}));
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
        <Routes>
          <Route path='/product/:id' element={<ProductDetails/>} />
        </Routes>
        <Routes>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Routes>
          <Route path='/auth/callback' element={<GoogleAuthCallback/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
