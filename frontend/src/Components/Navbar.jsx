import Logo from "../assets/logo.svg";
import Search from "./Search";
import Cart from "../assets/icons/cart.svg";
import Profile from "../assets/icons/profile.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchProductsBySearch,
    fetchProducts as fetchAllProducts,
} from "../store/ProductsSlice";
import { userReducer } from "../store/UserSlice";

const Navbar = ({ search = true }) => {
    const [query, setQuery] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let isMounted = useRef(null);
    const cartItemCount = useSelector((state) => state.product.cart.itemCount);
    const isAuth = useSelector((state) => state.user.isAuth);
    const username = useSelector((state) => state.user.info.username);
    const filters = useSelector((state) => state.product.filters);
    const pageLimit = useSelector((state) => state.product.limit);

    useEffect(() => {
        const fetchProducts = () => {
            const q = query;
            if (q.length > 0) {
                dispatch(
                    fetchProductsBySearch({ query: q.trim(), limit: pageLimit })
                );
            } else {
                dispatch(fetchAllProducts({ filters, limit: pageLimit }));
            }
        };
        if (isMounted.current) {
            fetchProducts();
        } else {
            isMounted.current = true;
        }
    }, [query]);

    return (
        <div className="grid grid-cols-3 p-4 pt-6 md:pt-4 w-full md:max-w-7xl md:mx-auto">
            <Link className="w-20 md:w-28" to="/">
                <img className="w-full" src={Logo} alt="Logo" />
            </Link>
            {search && <Search searchQuery={setQuery} />}
            <div className="flex items-center xs:mb-4 lg:mb-0 md:gap-12 gap-8 col-start-3 col-end-4 justify-self-end relative">
                <div className={`nav-cart-info w-7`}>
                    {cartItemCount > 0 && (
                        <div className="pt-[1px] text-sm text-center w-[22px] h-[22px] bg-primary text-white font-open font-bold rounded-full absolute top-[-8px] right-[-8px]">
                            {cartItemCount}
                        </div>
                    )}
                    <Link to="/cart">
                        <img className="w-7" src={Cart} alt="cart" />
                    </Link>
                </div>
                {isAuth ? (
                    <button className="flex md:gap-4 gap-2 relative group cursor-pointer">
                        <h1 className="font-medium text-lg">{username}</h1>
                        <img
                            className="mr-6 md:mr-0 w-7"
                            src={Profile}
                            alt="Profile"
                        />
                        <div className="pt-4 cursor-pointer group-hover:visible invisible w-[150px] absolute top-5 right-1 bg-transparent transition-all duration-75 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 origin-top">
                            <div className="shadow-md rounded-md bg-white">
                                <Link to="/orders">
                                    <p className="text-center p-3 hover:bg-slate-50 text-slate-600 ">
                                        Orders
                                    </p>
                                </Link>
                                <hr className="mx-2 opacity-70" />
                                <p
                                    className="text-red-500 hover:bg-slate-50 text-center p-3"
                                    onClick={() => {
                                        dispatch(userReducer.logoutUser());
                                        navigate("/", { replace: true });
                                    }}
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="px-6 py-2 rounded-full bg-primary text-white text-sm">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
