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

const user = createSlice({
    name: "user",
    initialState: {
        token: "",
        info: {},
        isAuth: false,
        isLoading: false,
        error: false,
    },
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
