import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productReducer } from "../store/ProductsSlice";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SuccessImg from "../assets/paymentSuccess.gif";
import FailedImg from "../assets/paymentFailed.png";

export const PaymentStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const [param, setParam] = useSearchParams();

    const sessionId = param.get("session_id");

    useEffect(() => {
        const checkStatus = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_BASE_URL
                    }/api/order/status?session_id=${sessionId}`
                );
                if (response.data.status === "paid") {
                    dispatch(productReducer.clearCartItems());
                }
                setStatus(response.data.status);
                setLoading(false);
            } catch (err) {
                console.log(err);
                if (err.response.status === 404) {
                    setStatus("unknown");
                    setLoading(false);
                }
            }
        };
        checkStatus();
    }, []);

    return (
        <div>
            <Navbar search={false} />
            {!loading ? (
                <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
                    {status === "paid" ? (
                        <div className="flex flex-col px-4 md:px-0 justify-center items-center">
                            <img
                                src={SuccessImg}
                                className="max-w-sm"
                                alt="payment success"
                            />
                            <h1 className="text-3xl font-bold text-slate-700 text- text-center">
                                Your Order has been placed!
                            </h1>
                            <p className="text-center hidden md:block text-slate-500 mt-2">
                                Payment successful, your order will be delivered
                                soon
                            </p>
                            <Link to="/orders">
                                <button className="text-medium mt-6 font-open text-sm font-medium text-white bg-slate-700 py-3 px-8 rounded-md">
                                    Go to orders
                                </button>
                            </Link>
                        </div>
                    ) : status === "unpaid" ? (
                        <div className="flex flex-col justify-center items-center">
                            <div className=" bg-red-100 rounded-full flex flex-col items-center justify-center p-12">
                                <img
                                    src={FailedImg}
                                    className="max-w-[50px]"
                                    alt="payment success"
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-700 mt-8 text-center">
                                Payment Failed!
                            </h1>
                            <p className="text-center text-slate-500 mt-2">
                                Sorry, your order cannot be placed
                            </p>
                            <Link to="/">
                                <button className="text-medium mt-6 font-open text-sm font-medium text-white bg-slate-700 py-3 px-8 rounded-md">
                                    Return home
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <h2>Session not found</h2>
                    )}
                </div>
            ) : (
                <p className="text-center mt-20">Loading...</p>
            )}
        </div>
    );
};
