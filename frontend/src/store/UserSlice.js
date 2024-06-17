import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const googleAuthData = createAsyncThunk(
    "/auth/google",
    async (search) => {
        const response = await axios.get(
            `${
                import.meta.env.VITE_BASE_URL
            }/api/auth/google/callback/${search}`
        );
        return response.data;
    }
);

const loadInitialState = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = JSON.parse(localStorage.getItem("token"));
        return {
            token: token || "",
            info: user || {},
            isAuth: !!token,
            isLoading: false,
            error: false,
        };
    } catch (err) {
        console.log("Could not load data from local storage", err);
    }
};

const initialState = loadInitialState();

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUserInfo(state, action) {
            state.info = action.payload.info;
            state.token = action.payload.token;
            state.isAuth = true;
        },
        logoutUser(state) {
            state.info = {};
            state.token = "";
            state.isAuth = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(googleAuthData.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(googleAuthData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.info = action.payload.user;
                state.token = action.payload.jwt;
                state.isAuth = true;
                localStorage.setItem(
                    "token",
                    JSON.stringify(action.payload.jwt)
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(action.payload.user)
                );
            }),
            builder.addCase(googleAuthData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            });
    },
});

export const userReducer = user.actions;

export default user;
