import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { googleAuthData } from "../store/UserSlice";

const GoogleAuthCallback = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            try {
                dispatch(googleAuthData(location.search));
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
