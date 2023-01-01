import Logo from "../assets/logo.svg";
import Search from "./Search";
import Cart from "../assets/icons/cart.svg";
import Profile from "../assets/icons/profile.svg";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchProductsBySearch } from "../store/ProductsSlice";

const Navbar = ({search=true}) => {
    const [query,setQuery] = useState('');

    const dispatch = useDispatch();
    const cartItemCount = useSelector(state => state.product.cart.itemCount);
    const isAuth = useSelector(state => state.user.isAuth);
    const username = useSelector(state => state.user.info.username);

    useEffect(() => {
             const fetchProducts = setTimeout(() => {
                 let q=query;
                 dispatch(fetchProductsBySearch(q.trim()));
                },800);
           return () => clearTimeout(fetchProducts)
    },[query])

    return (
        <div className="flex p-4  justify-between max-w-7xl mx-auto">
            <Link to="/"><img className="w-28" src={Logo} alt="Logo" /></Link>
            <Search search={search} searchQuery={setQuery}/>
            <div className="flex items-center gap-12">
                <div className={`nav-cart-info`}>
                    {cartItemCount>0&&<div className="pt-[1px] text-sm text-center w-[22px] h-[22px] bg-primary text-white font-open font-bold rounded-full absolute top-[-8px] right-[-8px]">{cartItemCount}</div>}
                    <Link to="/cart"><img className="w-7" src={Cart} alt="cart" /></Link>
                </div>
                {isAuth?<div className="flex gap-4"><h1 className="font-medium text-lg">{username}</h1><img className="w-7" src={Profile} alt="Profile" /></div>:<Link to="/login">
                    <button className="px-6 py-2 rounded-full bg-primary text-white text-sm">Login</button>
                </Link>}
            </div>
        </div>
    )
}

export default Navbar;