import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const googleAuthData = createAsyncThunk('/auth/google',async (search) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/google/callback/${search}`)
    return response.data;
})

const user = createSlice({
    name:'user',
    initialState: {
        token:'',
        info:{},
        isAuth:false,
        isLoading:false,
        error:false
    },
    reducers:{
    },
    extraReducers: {
        [googleAuthData.pending]: (state) => {
            state.isLoading = true;
        },
        [googleAuthData.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.info = action.payload.user;
            state.token = action.payload.jwt;
            state.isAuth = true;
        },
        [googleAuthData.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
})

export default user;