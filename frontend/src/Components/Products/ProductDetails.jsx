import Navbar from "../Navbar";
import { Link,useParams } from "react-router-dom";
import { useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useSelector,useDispatch } from "react-redux";
import { fetchProductsById,productReducer } from "../../store/ProductsSlice";
import Products from "./Products";

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const {data:product, loading, error} = useSelector(state => state.product.singleProduct);
    const cartItem = useSelector(state => state.product.cart.items.find(item => item.id===+params.id));

    if(!loading) {
      var  {id,attributes:{title,category,description,stockLeft,ratings,image,colors,price}} = product;
    }

    useEffect(() => {
        dispatch(fetchProductsById(params.id))
    },[params.id])

    const handleAddtoCart = () => {
        const product = {id,title,price,stockLeft,color:'red',image:image.data.attributes.url}
        dispatch(productReducer.addtoCart(product));
    }

    let button;
    if(typeof cartItem === typeof undefined) {
        button = <button className="text-medium font-open text-sm font-medium text-primary rounded-md py-4 px-8 border border-primary" onClick={handleAddtoCart}>Add to cart</button>
    } else {
        button = <Link to="/cart" className="text-medium font-open text-sm font-medium text-primary rounded-md py-4 px-8 border border-primary">Go to cart</Link>
    }

    return (
        <div>
            <Navbar search={false}/>
            {loading?<div>Loading....</div>:<div className="max-w-7xl mx-auto mt-4">
                <div>
                    <Link className="text-primary mr-2 font-open" to="/">Home</Link> &gt; 
                    <Link className="text-primary mr-2 ml-2 font-open" to={`/?category=${category}`}>{category}</Link> &gt; 
                    <span className="ml-2 font-open">{title}</span>
                </div>
                <div className="flex gap-4 mt-6">
                    <img className="flex-1 p-8" src={`http://localhost:1337${image.data.attributes.url}`} alt="Asus" />
                    <div className="mt-8">
                        <h1 className="font-medium text-gray-700 text-4xl">{title}</h1>
                        <div className="flex items-center justify-between max-w-lg mt-6 mb-1">
                            <Rating initialValue={ratings} size={25} readonly/>
                            <span className="text-gray-400">Only {stockLeft} stocks left</span>
                        </div>
                        <span className="text-gray-400">Ratings {ratings}.0</span>
                        {!colors??<p className="text-gray-400 ">Available colors</p>}
                        {!colors??<div className="flex gap-3 mb-6 mt-2">
                            {colors.map((color) => <div key={color} className="w-5 h-5 border border-gray-300 rounded-full p-3" style={{background:`${color}`}}></div>)}
                        </div>}
                        <p className="text-2xl font-bold text-gray-700 mt-6">&#8377; {price}</p>
                        <div className="mt-12 flex gap-6 ">
                            <button className="text-medium font-open text-sm font-medium text-white bg-primary py-4 px-12 rounded-md">Buy now</button>
                            {button}
                        </div>
                    </div>

                    </div>
                    <div className="mt-6 max-w-5xl ml-12" >
                        <h1 className="text-3xl font-medium text-gray-700">Description</h1>
                        <p className="leading-7 font-open text-gray-500 mt-6">{description}</p>
                </div>
                <div className="mt-20 mb-20">
                <h1 className="text-3xl font-medium text-gray-700 mb-8">Similar Products</h1>
                <Products category={category} limit={2}/>
                </div>
            </div>}
        </div>
    )
}

export default ProductDetails;