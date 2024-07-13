import React, { useRef, useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(null, args);
        }, wait);
    };
};

const StepperSlider = ({ min, max, step, onChange }) => {
    const sliderRef = useRef(null);
    const [priceRangeUi,setPriceRangeUi] = useState([min,max]);

    const debouncedOnChange = useCallback(debounce(onChange, 100), []);
    const priceRange = useSelector(
        (state) => state.product.filters.filter.priceRange
    );

    useEffect(() => {
        setPriceRangeUi(priceRange);
    },[priceRange])


    const handleSliderChange = (index, newValue) => {
        const newValues = [...priceRange];
        // Ensure the new priceRange does not cross the other thumb
        if (index === 0) {
            newValues[0] = Math.min(newValue, priceRange[1] - step);
        } else {
            newValues[1] = Math.max(newValue, priceRange[0] + step);
        }
        setPriceRangeUi(newValues)
        debouncedOnChange(newValues);
    };

    const handleChangeStart = (index) => (event) => {
        event.preventDefault();
        const moveEvent =
            event.type === "mousedown" ? "mousemove" : "touchmove";
        const endEvent = event.type === "mousedown" ? "mouseup" : "touchend";

        const onMove = (e) => {
            const clientX = e.clientX || e.touches[0].clientX;
            if (sliderRef.current) {
                const rect = sliderRef.current.getBoundingClientRect();
                const offset = clientX - rect.left;
                const newValue =
                    Math.round(((offset / rect.width) * (max - min)) / step) *
                        step +
                    min;
                if (newValue >= min && newValue <= max) {
                    handleSliderChange(index, newValue);
                }
            }
        };

        const onEnd = () => {
            document.removeEventListener(moveEvent, onMove);
            document.removeEventListener(endEvent, onEnd);
        };

        document.addEventListener(moveEvent, onMove);
        document.addEventListener(endEvent, onEnd);
    };

    return (
        <div className="w-[90%] max-w-[100%] text-center mx-auto">
            <div className="mb-8 font-bold text-slate-700 text-xl">
                <span>
                    {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                    }).format(Number(priceRangeUi[0]))}
                </span>
                <span> - </span>
                <span>
                    {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                    }).format(Number(priceRangeUi[1]))}
                </span>
            </div>
            <div
                className="w-full flex justify-between ml-2 relative"
                ref={sliderRef}
            ></div>
            <div
                id="slider"
                className="relative h-[6px] bg-slate-300/70 rounded-md"
                ref={sliderRef}
            >
                <div
                    className="absolute h-full rounded-md bg-primary"
                    style={{
                        left: `${((priceRangeUi[0] - min) / (max - min)) * 100}%`,
                        right: `${
                            100 - ((priceRangeUi[1] - min) / (max - min)) * 100
                        }%`,
                    }}
                />
                <div
                    className="absolute top-[-9px] w-[25px] h-[25px] bg-white border-2 rounded-full border-primary cursor-pointer shadow-sm"
                    style={{
                        left: `${((priceRangeUi[0] - min) / (max - min)) * 100}%`,
                    }}
                    onMouseDown={handleChangeStart(0)}
                    onTouchStart={handleChangeStart(0)}
                />
                <div
                    className="absolute top-[-9px] w-[25px] h-[25px] bg-white border-2 rounded-full border-primary cursor-pointer shadow-sm"
                    style={{
                        left: `${((priceRangeUi[1] - min) / (max - min)) * 100}%`,
                    }}
                    onMouseDown={handleChangeStart(1)}
                    onTouchStart={handleChangeStart(1)}
                />
            </div>
        </div>
    );
};

export default StepperSlider;
