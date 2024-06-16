import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productReducer } from "../../store/ProductsSlice";

const Pagination = () => {
    const totalProductCount = useSelector(
        (state) => state.product.product.totalCount
    );
    const pageLimit = useSelector((state) => state.product.product.limit);
    const curPage = useSelector((state) => state.product.product.curPage);

    const dispatch = useDispatch();

    return (
        <div className="flex justify-center mb-12 mt-6 mx-auto ">
            {Math.ceil(totalProductCount / pageLimit) === 1 || (
                <div className="flex items-center border border-slate-300 p-2">
                    {curPage === 1 || (
                        <button
                            className="text-md flex font-bold gap-1 text-slate-600 p-2 px-4 items-center"
                            onClick={() =>
                                dispatch(productReducer.decrementPage())
                            }
                        >
                            <span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16 5L6 12L16 19"
                                        strokeWidth="2"
                                        className="stroke-slate-600"
                                    />
                                </svg>
                            </span>
                            <span>Prev</span>
                        </button>
                    )}
                    {new Array(Math.ceil(totalProductCount / pageLimit))
                        .fill("0")
                        .map((p, i) => (
                            <button
                                key={i + 1}
                                onClick={() =>
                                    dispatch(
                                        productReducer.incrementByPage(i + 1)
                                    )
                                }
                                className={` text-md font-bold p-2 px-4 ${
                                    curPage === i + 1
                                        ? "text-primary  bg-primary/20"
                                        : "text-slate-600 bg-transparent"
                                } `}
                            >
                                <span>{i + 1}</span>
                            </button>
                        ))}
                    {Math.ceil(totalProductCount / pageLimit) === curPage || (
                        <button
                            className="text-md flex gap-1 items-center justify-center font-bold text-slate-600  p-2 px-4"
                            onClick={() =>
                                dispatch(productReducer.incrementPage())
                            }
                        >
                            <span>Next</span>
                            <span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 5L18 12L8 19"
                                        className="stroke-slate-600"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Pagination;
