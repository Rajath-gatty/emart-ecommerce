import {configureStore} from "@reduxjs/toolkit";
import product from "./ProductsSlice";
import user from "./UserSlice";

const store = configureStore({
    reducer:{product:product.reducer,user:user.reducer}
});

export default store;