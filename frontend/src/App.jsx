import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Components/Products/ProductDetails";
import Cart from "./Pages/Cart";
import GoogleAuthCallback from "./Pages/GoogleAuthCallback";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "./store/UserSlice";
import { productReducer } from "./store/ProductsSlice";
import axios from "axios";
import { useLayoutEffect } from "react";
import { PaymentStatus } from "./Pages/PaymentStatus";
import Order from "./Pages/Order";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);
    let token = useSelector((state) => state.user.token);

    useLayoutEffect(() => {
        token = JSON.parse(localStorage.getItem("token"));
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        if (cartItems) {
            dispatch(productReducer.loadItemsToCart(cartItems));
        }
        if (token) {
            const userInfo = JSON.parse(localStorage.getItem("user"));
            dispatch(userReducer.loadUserInfo({ token, info: userInfo }));
            axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        }
    }, [token]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <Routes>
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
                <Routes>
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                <Routes>
                    <Route
                        path="/orders"
                        element={isAuth ? <Order /> : <Navigate to="/login" />}
                    />
                </Routes>
                <Routes>
                    <Route path="/order/status" element={<PaymentStatus />} />
                </Routes>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Routes>
                    <Route
                        path="/auth/callback"
                        element={<GoogleAuthCallback />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
