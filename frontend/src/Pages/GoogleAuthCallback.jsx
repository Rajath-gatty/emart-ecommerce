import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { googleAuthData } from "../store/UserSlice";

const GoogleAuthCallback = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            try {
                const resultAction = await dispatch(
                    googleAuthData(location.search)
                );
                // const result = unwrapResult(resultAction);
                // console.log(result);
                navigate("/");
            } catch (err) {
                console.error("Google Authentication failed", err);
            }
        };

        authenticate();
    }, [location.search]);

    return (
        <div className="flex justify-center h-screen items-center">
            <p>Loading...</p>
        </div>
    );
};

export default GoogleAuthCallback;
