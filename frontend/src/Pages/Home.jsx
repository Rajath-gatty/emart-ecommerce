import React from "react";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products/Products";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto relative">
                <Products />
            </div>
        </>
    );
};

export default Home;
