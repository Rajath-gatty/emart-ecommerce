import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Components/Products/ProductDetails";
import Cart from "./Pages/Cart";
import GoogleAuthCallback from "./Pages/GoogleAuthCallback";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLayoutEffect } from "react";
import { PaymentStatus } from "./Pages/PaymentStatus";
import Order from "./Pages/Order";

function App() {
    const token = useSelector((state) => state.user.token);

    useLayoutEffect(() => {
        if (token) {
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
                        element={
                            token ? <Order /> : <Navigate to="/login" replace />
                        }
                    />
                </Routes>
                <Routes>
                    <Route path="/order/status" element={<PaymentStatus />} />
                </Routes>
                <Routes>
                    <Route
                        path="/login"
                        element={token ? <Navigate to="/" /> : <Login />}
                    />
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
