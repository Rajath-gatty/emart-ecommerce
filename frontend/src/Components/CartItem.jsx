import Bin from "../assets/icons/bin.svg";
import { productReducer } from "../store/ProductsSlice";

 const CartItem = ({item,dispatch}) => {

    const handleIncrement = (id) => {
        dispatch(productReducer.incrementCount(id))
    }
    const handleDecrement = (id) => {
        dispatch(productReducer.decrementCount(id))
    }
    const handleRemoveFromCart = (id) => {
        dispatch(productReducer.removeFromCart(id))
    }

  return (
    <div className="flex items-center gap-8 p-4 w-full border-b last:border-b-0">
    <img src={`http://localhost:1337${item.img}`} className="w-32 object-contain" alt="" />
    <div className="flex flex-col w-full">
        <div className="flex justify-between">
            <div>
                <h2 className="text-lg font-medium font-open mb-1">{item.title}</h2>
                <span className="text-gray-400 mr-4">red color</span>
                <span className="text-gray-400">only {item.stockLeft} stocks left</span>
            </div>
            <div className="w-[20px] cursor-pointer" onClick={()=>handleRemoveFromCart(item.id)}><img width={20} src={Bin} alt="bin" /></div>
        </div>
        <div className="flex gap-4 mt-6 justify-between">
            <div className="flex gap-4 items-center">
                <button className="w-[35px] h-[35px] bg-gray-200 rounded-full font-bold text-xl" onClick={() => handleIncrement(item.id)} >+</button>
                <span>{item.quantity}</span>
                <button className="w-[35px] h-[35px] bg-gray-100 rounded-full font-bold text-xl" onClick={() => handleDecrement(item.id)}>-</button>
            </div>
            <span className="text-xl font-bold font-open">&#8377; {item.price}</span>
        </div>
    </div>
</div>
  )
}

export default CartItem;
