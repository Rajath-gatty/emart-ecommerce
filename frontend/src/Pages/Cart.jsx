import Navbar from "../Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import OrderItem from "../Components/OrderItem";
import axios from "axios";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.product.cart.items);
    const totalPrice = useSelector((state) => state.product.cart.totalPrice);
    const isAuth = useSelector((state) => state.user.isAuth);

    const handleCheckout = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/order/checkout`,
                {
                    items: cartItems.map((item) => {
                        return {
                            id: item.id,
                            qty: item.quantity,
                        };
                    }),
                }
            );
            window.location.href = res.data.url;
        } catch (err) {
            console.log(err);
        }
    };

    let checkoutBtn;

    if (isAuth) {
        checkoutBtn = (
            <button
                className="bg-gray-800 text-white rounded font-medium w-full p-4 mt-8"
                onClick={handleCheckout}
            >
                PAY NOW
            </button>
        );
    } else {
        checkoutBtn = (
            <button
                className="bg-gray-800 text-white rounded font-medium w-full p-4 mt-8"
                onClick={() =>
                    (window.location = `${
                        import.meta.env.VITE_BASE_URL
                    }/api/connect/google`)
                }
            >
                LOGIN TO PAY
            </button>
        );
    }

    return (
        <>
            <Navbar search={false} />
            <div className="max-w-6xl md:mx-auto mt-4 mx-2">
                <h1 className="md:text-3xl text-2xl font-open font-bold mb-4">
                    My cart
                </h1>
                {cartItems.length > 0 ? (
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-[2]">
                            <div className="border border-gray-200 rounded-lg py-2 px-2 bg-gray-50/50">
                                {cartItems.map((item) => {
                                    return (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            dispatch={dispatch}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex-1 ">
                            <div className="border border-gray-200 mb-6 md:mb-0 rounded-lg py-2 px-2 bg-gray-50/50">
                                <h1 className="text-2xl font-bold ml-4 mb-4">
                                    Order Summary
                                </h1>
                                {cartItems.map((item) => {
                                    return (
                                        <OrderItem key={item.id} item={item} />
                                    );
                                })}
                                <table className="w-full max-w-[300px] text-right mx-auto mt-4">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td className="text-md font-medium">
                                                &#8377;{" "}
                                                {totalPrice.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-3">
                                                <h1 className="text-2xl font-bold font-open text-gray-800">
                                                    Total
                                                </h1>
                                            </td>
                                            <td className="font-bold text-2xl text-gray-800">
                                                &#8377;{" "}
                                                {totalPrice.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {checkoutBtn}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center h-[50vh] items-center">
                        <h1 className="text-center font-bold text-gray-400 text-2xl mt-8">
                            Cart is Empty
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
        </>
    );
};

export default Cart;
