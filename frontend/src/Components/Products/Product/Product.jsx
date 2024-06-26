import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const Product = ({
    link,
    title,
    stockLeft,
    price,
    img,
    ratings,
    rowFilter,
    description,
}) => {
    return (
        <Link to={link}>
            <div
                className={`bg-light-grey border ${
                    rowFilter ? "flex gap-24 items-center" : ""
                } border-grey w-full rounded-lg p-4 h-full`}
            >
                <img
                    className={`w-[240px] ${
                        rowFilter ? "h-full" : "h-40"
                    } mb-5 object-contain mx-auto`}
                    src={`${img}`}
                    alt="img"
                />
                <div>
                    <span className="font-medium md:text-xl text-lg  text-gray-700">
                        {title.substring(0, 30)}
                    </span>
                    {title.length > 40 && <span>....</span>}
                    <p className="md:text-lg text-sm text-gray-400 mt-1">
                        Only {stockLeft} stocks left
                    </p>
                    <div className="mt-4 mb-4">
                        <Rating initialValue={ratings} size={24} readonly />
                    </div>
                    {rowFilter && (
                        <p className="text-gray-500">
                            {description.substring(0, 300)}
                            {description.length > 80 && "...."}
                        </p>
                    )}
                    <div className="flex justify-between">
                        <span
                            className={`font-bold text-2xl font-open text-gray-700 ${
                                rowFilter ? "mt-4" : ""
                            }`}
                        >
                            &#8377; {price.toLocaleString("en-IN")}
                        </span>
                        <svg
                            id="Layer_1"
                            width="24"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 646.24 646.24"
                        >
                            <defs></defs>
                            <path
                                className="product-cart-icon"
                                d="M1672.54,387.34c-2.6-12-3-24.65-8.91-35.76-5.58-10.42-14.32-17.09-25.92-20.06a45,45,0,0,0-11.23-1.1c-12,0-24.07-.28-36.09.12-7.93.26-13.83-2.3-17.62-9.36v-8c.86-1.35,1.65-2.76,2.6-4,2.44-3.3,5.46-5.44,9.84-5.42,17.24.1,34.48-.35,51.72.21,1.33.64,2.9.32,4.2,1.08,10.29,1.47,19.35,5.84,27.52,12.06a67.53,67.53,0,0,1,23.88,33.58c.87,1.45.3,3.3,1.29,4.72l.13,1.25c.88,1.24.16,2.93,1.17,4.14,1.46,7.8,2.88,15.61,4.38,23.4s3.1,15.44,4.56,23.18c.48,2.57,1.33,3.94,4.43,3.93,30.65-.12,61.29-.08,91.94-.05,7.15,0,11.47,2.82,13.92,9.29,3.09,8.15-3.63,17.18-10.94,17.23-15.93.1-31.87.1-47.81.12-13.81,0-27.63.05-41.45,0-2.6,0-3.72.06-2.93,3.38,1.75,7.27,2.6,14.74,4.27,22s2.77,14.91,4.72,22.27c1.89,7.13,2.33,14.63,4.13,21.79,1.34,5.39,2.19,10.87,3.33,16.27,1.07,5.05,2.13,10.17,3,15.29,1.23,7,2.89,14,4.28,21,1.09,5.49,1.75,11.09,3.19,16.49,1.38,5.22,2,10.57,3.41,15.8,1.18,4.4,1.88,9,2.71,13.55,1.12,6.19,2.21,12.38,3.69,18.5a13.74,13.74,0,0,1,.15,2.66c.64,1.31.25,2.91,1.19,4.13.77,6.16,2.47,12.12,3.61,18.19.91,4.88,2.08,9.71,2.86,14.61s2.3,9.46,2.62,14.35a2.32,2.32,0,0,0,2.51,2.19c.89,0,1.79,0,2.68,0H2082c5.25,0,5-.05,5.89-5.31,1.59-9.06,3.54-18.06,5.43-27.07.6-2.89.82-5.9,2.31-8.56,2.92-5.21,9.18-8.13,14.48-6.85,5.5,1.33,11.28,6.88,10.6,13.39-.13,1.21-.09,2.45-.13,3.67-.72,1.29-.3,2.9-1.16,4.15l-.24,2.55c-.9,1-.18,2.51-1.16,3.47,0,5.26-2.13,10.15-2.75,15.3-1.21,1.87-.57,4.12-1.27,6.09-1.32,6.16-1.75,12.54-4.12,18.43-2.25,5.62-7.25,7.36-12.75,8a33.52,33.52,0,0,1-4,0H1758c-21.07,0-42.14,0-63.21,0-5.63,0-9.9,1.85-12.61,7a13.33,13.33,0,0,0,10.65,19.59c1.89.14,3.79.07,5.69.07q225.27,0,450.53,0c5.61,0,10.58,1,13.81,6.14a12.92,12.92,0,0,1,.42,14c-2.25,3.87-5.78,6.57-10.71,6.47-1.23,0-2.45.05-3.68.05q-225.76,0-451.54.06c-8.1,0-15.91-.73-23-4.94-10.06-5.95-16.75-14.38-19.59-25.9-4.37-17.75,3.93-35.34,19-44.27,6.67-4,14-5.45,21.57-5.54,10.59-.11,21.18,0,31.78,0,3.68,0,4.94-1.32,3.31-4.52-1.45-2.84-1.66-6-2.09-8.74-1.52-9.67-3.76-19.19-5.56-28.79-1.35-7.18-2.92-14.36-4.5-21.5-1.16-5.27-2.15-10.7-3-16.1-1.09-7.06-2.91-14-4.33-21-1.08-5.38-1.77-10.86-3.14-16.17s-2.08-10.84-3.34-16.22c-1.1-4.7-1.81-9.54-2.84-14.29-1.63-7.5-2.9-15.08-4.69-22.56-.74-3.08-1.33-6.36-1.78-9.59-.75-5.37-2-10.66-3.05-16-1-5.08-2.25-10.14-3-15.26-.38-2.62-1.92-5-1.33-7.81-.64-1.3-.22-2.92-1.24-4.11-.89-3.69-1.4-7.44-2.42-11.13-.71-2.53-.91-5.31-1.46-8-2.06-10.15-3.88-20.36-5.79-30.54q-1.61-8.56-3.19-17.14C1672.8,389.84,1673.48,388.34,1672.54,387.34Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M2062.47,249.6c.24.41.49.82.74,1.23-3.18-.14-6.54,1.11-9.44-1.23Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M2033,249.6c-2.63,2.42-5.81,1-8.75,1.25l1.39-1.25Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M2216.44,453.09c-.08-2.14-.91-4.42,1.15-6.17C2217.81,449.09,2217.84,451.23,2216.44,453.09Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M1924.76,296.54a9.25,9.25,0,0,1-4.74,4.62A11.47,11.47,0,0,1,1924.76,296.54Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M1871.93,457.57c1.55,1.06,1.3,2.62,1.16,4.15C1871.15,460.77,1871.89,459.07,1871.93,457.57Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M1873.07,388c.23,1.56.37,3.08-1.14,4.16C1871.93,390.66,1871.21,389,1873.07,388Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M1874.43,382c0,1.49.84,3.23-1.21,4.12A4.38,4.38,0,0,1,1874.43,382Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M1686.52,457.65c2.19.83,1.2,2.63,1.24,4.11C1686.9,460.52,1686,459.3,1686.52,457.65Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M2219,414.84c-1.41-2.71-.34-5.63-.67-8.43.48-5.41-.79-10.62-1.85-15.84a183.38,183.38,0,0,0-7.37-26,172.78,172.78,0,0,0-12.91-27.76,180.56,180.56,0,0,0-32.31-40.65c-11-10.46-23.31-18.95-36.42-26.38a160.11,160.11,0,0,0-36.16-14.53c-9.29-2.61-18.69-5.11-28.49-5-3-.3-6.12.68-9.06-.67H2033c-2.76,1.48-6,0-8.75,1.25a157.25,157.25,0,0,0-30.19,6.11,168.61,168.61,0,0,0-32.56,13.25,178.55,178.55,0,0,0-36.77,26.33,43.09,43.09,0,0,1-4.74,4.62c-4.86,5.17-9.7,10.35-14,16a171.59,171.59,0,0,0-25.31,44.77c-2.47,6.57-5,13.15-6.23,20.09-.68,1.29-.27,2.9-1.21,4.12l-.15,1.88c-1,1.23-.29,2.9-1.14,4.16-1,6.88-2.28,13.74-2.59,20.71-.66,15-.14,29.92,2.59,44.71.84,1.26.16,2.94,1.16,4.15-.1,3.58,1.56,6.72,2.43,10.07a147.7,147.7,0,0,0,10.79,28.81c8.27,16.48,18.36,31.72,31.45,44.95a206.19,206.19,0,0,0,22.69,20.05,165.86,165.86,0,0,0,40.06,22.08c8.56,3.3,17.23,6.43,26.38,7.85,1.22,1,2.89.31,4.15,1.14,2.47-.06,4.77.89,7.15,1.2a214.85,214.85,0,0,0,30.22,1.63c9.45-.09,18.74-1.38,28-2.79,1.25-.9,2.93-.2,4.16-1.14,3.63-.21,6.93-1.72,10.39-2.54a137.17,137.17,0,0,0,26.29-9.41,171.9,171.9,0,0,0,35.76-22.26,178.54,178.54,0,0,0,37.36-41.11,173.91,173.91,0,0,0,20.14-42.36c2.59-8.13,4.95-16.29,5.89-24.8.86-2,.11-4.23,1.15-6.17l.21-3.88c1.33-2.81-.35-6,1.21-8.8Zm-27.07,15.29a145,145,0,0,1-5.35,33.34,152.08,152.08,0,0,1-14.28,34.8,147.44,147.44,0,0,1-62.58,59A144.33,144.33,0,0,1,2072.88,570a163,163,0,0,1-39.08,2.67c-2.61-1.2-5.55,0-8.17-1.13a130.28,130.28,0,0,1-29.07-6.57,148.56,148.56,0,0,1-88.15-81.1,154.87,154.87,0,0,1-10.19-33.54,137.66,137.66,0,0,1-2-37.48c2.3-25.21,10.14-48.64,24.31-69.84a152.07,152.07,0,0,1,34.85-36.86,147.68,147.68,0,0,1,175.78-1,146.05,146.05,0,0,1,51.22,67.12A142.46,142.46,0,0,1,2191.94,430.13Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M1837.28,819.93c-9.59-19.26-24.84-30.32-46.72-31.55a53.42,53.42,0,0,0-53.6,36.89c-5,15.54-3.33,30.77,5.31,44.72a52.84,52.84,0,0,0,30.63,23.59c2.39.72,5.39-.13,7.26,2.26h14.71c1.15-1.13,2.84-.38,4.08-1.21a52,52,0,0,0,6.93-1.72c17.92-7.06,29.81-19.59,34.57-38.5.88-1.25.52-2.84,1.14-4.17C1842.33,839.83,1842,829.47,1837.28,819.93Zm-49.13,49c-16.34-.37-27-12.69-27-26.92,0-14.86,11.48-27.1,27.52-26.92A26.78,26.78,0,0,1,1815,842.2C1815,856.88,1802.77,869.26,1788.15,868.92Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M2072.94,808.91c-15.45-20.08-43.47-25.93-64.91-15.67-17.94,8.58-28.25,22.85-30.93,42.21-2.06,14.86,2,28.57,11.59,40.29,8,9.85,18.28,16.37,30.9,18.86,1.71.83,3.77.11,5.41,1.24h12c1.12-1.22,2.91-.2,4.09-1.22,1.71,0,3.2-.7,4.78-1.2,21.06-6.64,33.7-21.21,37.6-42.5C2086.29,835.78,2082.63,821.5,2072.94,808.91Zm-24.78,53.39c-13.95,12.28-36.11,6.62-42.73-10.73-5-13,1-28.66,14.36-34.15a34.48,34.48,0,0,1,13.78-2.42c1.52.77,3.39.13,4.82,1.21C2059.11,823.08,2063.79,848.52,2048.16,862.3Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                            <path
                                className="product-cart-icon"
                                d="M2093.41,437.83c-10.82,0-21.63.1-32.44-.07-2.85,0-3.58.88-3.57,3.59.09,21,0,41.92,0,62.88,0,6.31-2.46,11.12-8.54,13.53-7.89,3.12-17.76-1.55-17.91-10.54-.35-21.51-.23-43-.17-64.55,0-4.4-.63-4.9-4.81-4.88-20.51.08-41,0-61.54.06-6,0-10.64-1.72-13.27-7.59A13.25,13.25,0,0,1,1963,411.2c10.14-.09,20.29,0,30.43,0,11.15,0,22.3-.09,33.45,0,2.94,0,4-.58,4-3.84q-.24-31.77,0-63.55c0-8.1,5.73-13.5,13.66-13.36,7.32.14,12.89,6,12.92,13.86.08,20.06,0,40.13,0,60.2,0,6.64,0,6.63,6.57,6.64,20.17,0,40.35-.05,60.53,0,8.27,0,13.93,6.28,13.6,14.5-.23,5.54-5.76,12.09-12,12.05-10.92-.07-21.85,0-32.77,0Z"
                                transform="translate(-1572.77 -249.6)"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Product;
