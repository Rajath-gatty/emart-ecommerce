import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts',async ({category,limit}) => {
    let url;
    if(category) {
        url = `http://localhost:1337/api/products?filters[category][$eq]=${category}&pagination[limit]=${limit}&populate=image`;
    } else {
        url = `http://localhost:1337/api/products?pagination[limit]=${limit}&populate=image`;
    }
        const response = await axios.get(url);
        return response.data;
})

export const fetchProductsById = createAsyncThunk('products/fetchProducts/id',async (id) => {
    const response = await axios.get(`http://localhost:1337/api/products/${id}?populate=image`);
    return response.data;
})

export const fetchProductsBySearch = createAsyncThunk('products/fetchProductsBySearch',async (query) => {
    console.log(query);
    const response = await axios.get(`http://localhost:1337/api/products/?filters[title][$containsi]=${query}&populate=image`);
    return response.data;
})

const product = createSlice({
    name: "product",
    initialState: {
        product: {
            loading:true,
            error:false,
            data:[]
        },
        singleProduct:{
            loading:true,
            error:false,
            data:{}
        },
        cart: {
            items:[],
            itemCount:0,
            totalPrice:0
        }
    },
    reducers:{
        addtoCart(state,action) {
                let item = {};
                const product = action.payload;
                item.id = product.id;
                item.title = product.title;
                item.quantity = 1;
                item.price = product.price;
                item.color = product.color;
                item.img = product.image;
                item.stockLeft = product.stockLeft;
                state.cart.items.push(item);
                state.cart.itemCount++;
                state.cart.totalPrice = state.cart.totalPrice+product.price;
        },
        incrementCount(state,action) {
            state.cart.items.forEach((prod,i)=> {
                if(prod.id === action.payload) {
                    if(prod.quantity < prod.stockLeft) {
                        state.cart.itemCount++;
                        state.cart.items[i].quantity++;
                        state.cart.totalPrice = state.cart.totalPrice+prod.price;
                    }
                }
            });
        },
        decrementCount(state,action) {
            state.cart.items.forEach((prod,i)=> {
                if(prod.id === action.payload) {
                    if(prod.quantity > 1) {
                        state.cart.itemCount--;
                        state.cart.items[i].quantity--;
                        state.cart.totalPrice = state.cart.totalPrice-prod.price;
                    }
                }
            });
        },
        removeFromCart(state,action) {
            let itemPrice=0,qty=1;
           state.cart.items = state.cart.items.filter(prod => {
            if(prod.id === action.payload) {
                itemPrice = prod.price;
                qty = prod.quantity;
            }
            return prod.id !== action.payload
           })
           state.cart.totalPrice = state.cart.totalPrice-(itemPrice*qty);
           state.cart.itemCount = state.cart.itemCount - qty;
           itemPrice=0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending,(state,action) => {
             state.product.loading = true;
        })
        builder.addCase(fetchProducts.fulfilled,(state,action) => {
            state.product.loading = false;
             state.product.data = action.payload.data;
        })
        builder.addCase(fetchProducts.rejected,(state,action) => {
            state.product.loading = false;
            console.log(action.error)
            state.product.error = true;
        })
        builder.addCase(fetchProductsById.pending,(state,action) => {
            state.singleProduct.loading = true;
       })
       builder.addCase(fetchProductsById.fulfilled,(state,action) => {
            state.singleProduct.loading = false;
           state.singleProduct.data = {...action.payload.data}
       })
       builder.addCase(fetchProductsById.rejected,(state,action) => {
            state.singleProduct.loading = false;
            state.singleProduct.error = true;
       }),
       builder.addCase(fetchProductsBySearch.pending,(state,action) => {
            state.product.loading = true;
       }),
       builder.addCase(fetchProductsBySearch.fulfilled,(state,action) => {
            state.product.data = action.payload.data;
            state.product.loading = false;
       }),
       builder.addCase(fetchProductsBySearch.rejected,(state,action) => {
            state.product.error = true;
       })
    }
})

export const productReducer = product.actions;

export default product;