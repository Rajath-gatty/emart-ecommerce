import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from './Components/Products/ProductDetails';
import Cart from './Pages/Cart';
import GoogleAuthCallback from './Pages/GoogleAuthCallback';
import Login from './Pages/Login';

function App() {

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
