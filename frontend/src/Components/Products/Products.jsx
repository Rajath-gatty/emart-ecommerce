import Product from "./Product/Product";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/ProductsSlice";
import Skeleton from "../UI/Skeleton/Skeleton";
import { Filter } from "../UI/Filter";
import Pagination from "../UI/Pagination";
import SquaresIcon from "../UI/Icons/Squares";
import FilterIcon from "../UI/Icons/FilterIcon";

const Products = () => {
    const [rowFilter, setRowFilter] = useState(false);

    const dispatch = useDispatch();
    const fetchProductsRef = useRef(null);

    const { data: products, loading } = useSelector(
        (state) => state.product.product
    );
    const filters = useSelector((state) => state.product.filters);
    const pageLimit = useSelector((state) => state.product.product.limit);
    const curPage = useSelector((state) => state.product.product.curPage);

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("filters"))?.isApplied) {
            dispatch(fetchProducts({ filters, limit: 12 }));
        }
    }, []);

    useEffect(() => {
        if (fetchProductsRef.current) {
            dispatch(
                fetchProducts({ filters, limit: pageLimit, page: curPage })
            );
        } else {
            fetchProductsRef.current = true;
        }
    }, [filters, curPage]);

    return (
        <div className="w-full">
            <div className="flex justify-between mx-2 lg:mx-0 items-center border-b mt-4 lg:mt-8 border-gray-200">
                <h1 className="font-bold font-open m-0 text-2xl text-dark-grey mb-4">
                    Products
                </h1>
                <div className="flex items-center  justify-center gap-6 mr-2">
                    <div className="relative group">
                        <FilterIcon isApplied={filters.isApplied} />
                        <Filter />
                    </div>

                    <SquaresIcon
                        filter={rowFilter}
                        setRowFilter={setRowFilter}
                    />
                </div>
            </div>
            <div
                className={`grid ${
                    rowFilter
                        ? "grid-cols-1"
                        : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
                } gap-4 mt-2 lg:mt-4 mx-auto p-3 relative`}
            >
                {loading ? (
                    <Skeleton count={4} />
                ) : products.length > 0 ? (
                    products.map((prod) => {
                        return (
                            <Product
                                rowFilter={rowFilter}
                                key={prod.id}
                                link={`/product/${prod.id}`}
                                title={prod.attributes.title}
                                stockLeft={prod.attributes.stockLeft}
                                price={prod.attributes.price}
                                img={prod.attributes.image.data.attributes.url}
                                ratings={prod.attributes.ratings}
                                description={prod.attributes.description}
                            />
                        );
                    })
                ) : (
                    <div className="flex flex-col h-full justify-center w-full items-center">
                        <h1 className="text-center font-bold absolute left-1/3 top-8 text-gray-400 text-2xl">
                            No Products found
                        </h1>
                    </div>
                )}
            </div>
            {!loading && products.length > 0 && <Pagination />}
        </div>
    );
};

export default Products;
