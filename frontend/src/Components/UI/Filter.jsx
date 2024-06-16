import React, { useEffect, useState } from "react";
import StepperSlider from "./StepperSlider";
import { useDispatch, useSelector } from "react-redux";
import { productReducer } from "../../store/ProductsSlice";

export const Filter = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.product.filters.filter);
    const isFilterApplied = useSelector(
        (state) => state.product.filters.isApplied
    );
    const [checkboxState, setCheckboxState] = useState({
        Laptop: false,
        Television: false,
        SmartPhone: false,
    });

    useEffect(() => {
        dispatch(productReducer.fetchFilters());
    }, []);

    useEffect(() => {
        if (filters.category.length === 0) return;
        setCheckboxState((prev) => {
            const newState = { ...prev };

            for (const key in prev) {
                if (filters.category.includes(key)) {
                    newState[key] = true;
                } else {
                    newState[key] = false;
                }
            }
            return newState;
        });
    }, [filters]);

    const handleSliderChange = (newValue) => {
        dispatch(
            productReducer.setPriceFilter({
                priceRange: newValue,
            })
        );
        dispatch(productReducer.incrementByPage(1));
    };

    const handleFormChange = (e) => {
        let filteredCategory = [...filters.category];
        if (filters.category.includes(e.target.name)) {
            filteredCategory = filters.category.filter(
                (i) => i !== e.target.name
            );
        } else {
            filteredCategory.push(e.target.name);
        }
        setCheckboxState((prev) => ({
            ...prev,
            [e.target.name]: !prev[e.target.name],
        }));
        dispatch(
            productReducer.setCategoryFilter({
                category: filteredCategory,
            })
        );
        dispatch(productReducer.incrementByPage(1));
    };

    const handleClearFilters = () => {
        if (isFilterApplied) {
            setCheckboxState({
                Laptop: false,
                Television: false,
                SmartPhone: false,
            });
            dispatch(productReducer.clearFilters());
        }
    };

    return (
        <div className="absolute top-6 -right-4 md:-right-14  pt-3 z-10 transition-all duration-100 transform scale-75 opacity-0 group-hover:visible invisible group-hover:opacity-100 group-hover:scale-100 origin-top">
            <div className="bg-white shadow-lg border-2 border-slate-100 rounded-md p-4 md:w-[400px] w-[350px] min-w-[100px]">
                <div className="flex justify-between items-center">
                    <h2 className="uppercase text-lg font-medium text-slate-800">
                        Filter by
                    </h2>
                    <span
                        onClick={handleClearFilters}
                        className="text-primary cursor-pointer"
                    >
                        Clear filters
                    </span>
                </div>
                <div className="mt-4 mb-4">
                    <h3 className="text-slate-800 font-medium ">Price</h3>

                    <StepperSlider
                        min={1000}
                        max={100000}
                        step={10000}
                        onChange={handleSliderChange}
                    />
                </div>
                <hr className="mt-4 mb-4" />
                <div>
                    <h3 className="text-slate-800 font-medium mb-2 mt-2">
                        Category
                    </h3>
                    <div>
                        <form className="space-y-3 mt-4">
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="Laptop"
                                    value="laptop"
                                    id="laptop"
                                    className="w-5 accent-primary cursor-pointer"
                                    checked={checkboxState.Laptop}
                                    onChange={handleFormChange}
                                ></input>
                                <label>Laptop</label>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="Television"
                                    value="television"
                                    id="television"
                                    className=" w-5 accent-primary cursor-pointer"
                                    checked={checkboxState.Television}
                                    onChange={handleFormChange}
                                ></input>
                                <label>Television</label>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="SmartPhone"
                                    value="phone"
                                    id="phone"
                                    className="w-5 accent-primary text-white cursor-pointer"
                                    checked={checkboxState.SmartPhone}
                                    onChange={handleFormChange}
                                ></input>
                                <label>Phones</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
