import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/orders`
                );
                setOrders(response.data);
                isLoading(false);
            } catch (err) {
                console.log(err);
                isLoading(false);
            }
        };
        fetchOrders();
    }, []);
    return (
        <div>
            <Navbar search={false} />
            <div className="max-w-6xl mx-auto">
                <h1 className="mx-4 text-2xl mt-4 font-medium text-slate-600">
                    Orders
                </h1>
                {!loading ? (
                    <div className="w-full mt-6">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <Link
                                    key={order.id}
                                    to={`/product/${order.product.id}`}
                                >
                                    <div className="flex justify-between gap-4 items-center bg-gray-50/50 md:p-6 p-4 border overflow-hidden border-slate-100 mx-4">
                                        <div className="min-w-[100px]">
                                            <img
                                                src={order.product.image.url}
                                                className="max-w-[100px] max-h-[80px]"
                                            />
                                        </div>
                                        <div className="flex md:flex-row flex-col gap-4 md:gap-6 items-center justify-between w-full">
                                            <div>
                                                <h2 className="text-lg font-medium text-slate-600">
                                                    {order.product.title}
                                                </h2>
                                                <h2 className="text-md font-medium text-slate-600/80">
                                                    {new Intl.NumberFormat(
                                                        "en-IN",
                                                        {
                                                            style: "currency",
                                                            currency: "INR",
                                                        }
                                                    ).format(
                                                        Number(
                                                            order.totalAmount
                                                        )
                                                    )}
                                                </h2>
                                                <div className="flex gap-4 text-sm text-slate-400 mt-4">
                                                    <p>Qty {order.qty}</p>
                                                    <p className="text-slate-300">
                                                        |
                                                    </p>
                                                    <p>
                                                        {new Intl.DateTimeFormat(
                                                            "en-IN",
                                                            {
                                                                month: "long",
                                                                day: "numeric",
                                                                year: "2-digit",
                                                            }
                                                        ).format(
                                                            new Date(
                                                                order.createdAt
                                                            )
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-green-600 mr-4 w-full">
                                                    {order.status ===
                                                    "processing" ? (
                                                        <div className="flex gap-2 items-center w-full ml-36 md:ml-0">
                                                            <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
                                                            <p>In progress</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex gap-2 items-center">
                                                            <p>Delivered</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex flex-col justify-center h-[50vh] items-center">
                                <h1 className="text-center font-bold text-gray-400 text-2xl mt-8">
                                    No orders found
                                </h1>
                                <Link
                                    to="/"
                                    className="text-medium font-open font-medium text-white bg-primary py-4 px-12 rounded-md mt-8 text-center mx-auto"
                                >
                                    Shop now
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center mt-8">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Order;
