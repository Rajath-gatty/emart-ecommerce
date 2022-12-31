import Navbar from "../Components/Navbar"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import OrderItem from "../Components/OrderItem";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.product.cart.items);
    const totalPrice = useSelector(state => state.product.cart.totalPrice);

    return (
        <>
            <Navbar search={false}/>
            <div className="max-w-6xl mx-auto mt-4">
                <h1 className="text-3xl font-open font-bold mb-4">My cart</h1>
                {cartItems.length>0?<div className="flex gap-4">
                    <div className="flex-[2]">
                        <div className="border border-gray-200 rounded-lg py-2 px-2 bg-gray-50/50">
                            {cartItems.map(item => {
                                return <CartItem key={item.id} item={item} dispatch={dispatch}/>
                            })}
                        </div>
                    </div>
                    <div className="flex-1 ">
                        <div className="border border-gray-200 rounded-lg py-2 px-2 bg-gray-50/50">
                            <h1 className="text-2xl font-bold ml-4 mb-4">Order Summary</h1>
                            {cartItems.map(item => {
                                return <OrderItem key={item.id} item={item}/>
                            })}
                            <table className="w-full max-w-[300px] text-right mx-auto mt-4">
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className="text-md font-medium">&#8377; {totalPrice.toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs font-open text-gray-500">GST(18%)</td>
                                        <td>&#8377; {((totalPrice/100)*18).toLocaleString('en-IN')}</td>
                                    </tr>
                                    <tr>
                                        <td className="pt-3"><h1 className="text-2xl font-bold font-open text-gray-800">Total</h1></td>
                                        <td className="font-bold text-2xl text-gray-800">&#8377; {(totalPrice+(totalPrice/100)*18).toLocaleString('en-IN')}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="bg-gray-800 text-white rounded font-medium w-full p-4 mt-8">PAY NOW</button>
                        </div>
                    </div>
                </div>:<div className="flex flex-col justify-center h-[50vh] items-center">
                <h1 className="text-center font-bold text-gray-400 text-2xl mt-8">Cart is Empty</h1>
                <Link to="/" className="text-medium font-open font-medium text-white bg-primary py-4 px-12 rounded-md mt-8 text-center mx-auto">Shop now</Link>
                    </div>}
            </div>
        </>
    )
}

export default Cart;