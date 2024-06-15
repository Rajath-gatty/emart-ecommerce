import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({
        filters: {
            filter: { category, priceRange },
            isApplied,
        },
        limit = 12,
    }) => {
        let url;
        if (isApplied) {
            if (category.length > 0 && priceRange.length > 0) {
                const categoryStr = category
                    .map((c, i) => `filters[category][$in][${i}]=${c}`)
                    .join("&");
                url = `${
                    import.meta.env.VITE_BASE_URL
                }/api/products?${categoryStr}&filters[price][$gt]=${
                    priceRange[0]
                }&filters[price][$lt]=${
                    priceRange[1]
                }&pagination[limit]=${limit}&populate=image`;
            } else if (category.length > 0) {
                const categoryStr = category
                    .map((c, i) => `filters[category][$in][${i}]=${c}`)
                    .join("&");
                url = `${
                    import.meta.env.VITE_BASE_URL
                }/api/products?${categoryStr}&pagination[limit]=${limit}&populate=image`;
            } else if (priceRange.length > 0) {
                url = `${
                    import.meta.env.VITE_BASE_URL
                }/api/products?filters[price][$gt]=${
                    priceRange[0]
                }&filters[price][$lt]=${
                    priceRange[1]
                }&pagination[limit]=${limit}&populate=image`;
            }
        } else {
            url = `${
                import.meta.env.VITE_BASE_URL
            }/api/products?pagination[limit]=${limit}&populate=image`;
        }
        const response = await axios.get(url);
        return response.data;
    }
);

export const fetchProductsById = createAsyncThunk(
    "products/fetchProducts/id",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/products/${id}?populate=image`
        );
        return response.data;
    }
);

export const fetchProductsBySearch = createAsyncThunk(
    "products/fetchProductsBySearch",
    async ({ query }) => {
        const response = await axios.get(
            `${
                import.meta.env.VITE_BASE_URL
            }/api/products/?filters[title][$containsi]=${query}&populate=image`
        );
        return response.data;
    }
);

const product = createSlice({
    name: "product",
    initialState: {
        product: {
            loading: true,
            error: false,
            data: [],
        },
        filters: {
            isApplied: false,
            filter: {
                category: [],
                priceRange: [1000, 100000],
            },
        },
        singleProduct: {
            loading: true,
            error: false,
            data: {},
        },
        cart: {
            items: [],
            itemCount: 0,
            totalPrice: 0,
        },
    },
    reducers: {
        addtoCart(state, action) {
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
            state.cart.totalPrice = state.cart.totalPrice + product.price;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        incrementCount(state, action) {
            state.cart.items.forEach((prod, i) => {
                if (prod.id === action.payload) {
                    if (prod.quantity < prod.stockLeft) {
                        state.cart.itemCount++;
                        state.cart.items[i].quantity++;
                        state.cart.totalPrice =
                            state.cart.totalPrice + prod.price;
                        localStorage.setItem(
                            "cart",
                            JSON.stringify(state.cart)
                        );
                    }
                }
            });
        },
        decrementCount(state, action) {
            state.cart.items.forEach((prod, i) => {
                if (prod.id === action.payload) {
                    if (prod.quantity > 1) {
                        state.cart.itemCount--;
                        state.cart.items[i].quantity--;
                        state.cart.totalPrice =
                            state.cart.totalPrice - prod.price;
                        localStorage.setItem(
                            "cart",
                            JSON.stringify(state.cart)
                        );
                    }
                }
            });
        },
        removeFromCart(state, action) {
            let itemPrice = 0,
                qty = 1;
            state.cart.items = state.cart.items.filter((prod) => {
                if (prod.id === action.payload) {
                    itemPrice = prod.price;
                    qty = prod.quantity;
                }
                return prod.id !== action.payload;
            });
            state.cart.totalPrice = state.cart.totalPrice - itemPrice * qty;
            state.cart.itemCount = state.cart.itemCount - qty;
            itemPrice = 0;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        clearCartItems(state, action) {
            state.cart.items = [];
            state.cart.itemCount = 0;
            state.cart.totalPrice = 0;
            localStorage.removeItem("cart");
        },
        loadItemsToCart(state, action) {
            state.cart = action.payload;
        },
        clearFilters(state) {
            state.filters.isApplied = false;
            state.filters.filter.category = [];
            state.filters.filter.priceRange = [1000, 100000];
            localStorage.removeItem("filters");
        },
        fetchFilters(state) {
            const filters = JSON.parse(localStorage.getItem("filters"));
            if (!filters) return state;
            state.filters = filters;
        },
        setCategoryFilter(state, action) {
            if (
                action.payload.category.length > 0 ||
                (state.filters.filter.priceRange[0] > 1000 &&
                    state.filters.filter.priceRange[1] < 100000)
            ) {
                state.filters.isApplied = true;
            } else {
                state.filters.isApplied = false;
            }
            state.filters.filter.category = action.payload.category;
            localStorage.setItem(
                "filters",
                JSON.stringify({
                    isApplied: action.payload.category.length > 0,
                    filter: {
                        priceRange: state.filters.filter.priceRange,
                        category: action.payload.category,
                    },
                })
            );
        },
        setPriceFilter(state, action) {
            if (
                state.filters.filter.category.length > 0 ||
                action.payload.priceRange[0] > 1000 ||
                action.payload.priceRange[1] < 100000
            ) {
                state.filters.isApplied = true;
            } else {
                state.filters.isApplied = false;
            }
            state.filters.filter.priceRange = action.payload.priceRange;
            localStorage.setItem(
                "filters",
                JSON.stringify({
                    isApplied: state.filters.isApplied,
                    filter: {
                        priceRange: action.payload.priceRange,
                        category: state.filters.filter.category,
                    },
                })
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.product.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.product.loading = false;
            state.product.data = action.payload.data;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.product.loading = false;
            state.product.error = true;
        });
        builder.addCase(fetchProductsById.pending, (state, action) => {
            state.singleProduct.loading = true;
        });
        builder.addCase(fetchProductsById.fulfilled, (state, action) => {
            state.singleProduct.loading = false;
            state.singleProduct.data = { ...action.payload.data };
        });
        builder.addCase(fetchProductsById.rejected, (state, action) => {
            state.singleProduct.loading = false;
            state.singleProduct.error = true;
        }),
            builder.addCase(fetchProductsBySearch.pending, (state, action) => {
                state.product.loading = true;
            }),
            builder.addCase(
                fetchProductsBySearch.fulfilled,
                (state, action) => {
                    state.product.data = action.payload.data;
                    state.product.loading = false;
                }
            ),
            builder.addCase(fetchProductsBySearch.rejected, (state, action) => {
                state.product.error = true;
            });
    },
});

export const productReducer = product.actions;

export default product;
