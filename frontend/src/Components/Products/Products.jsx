import Product from "./Product/Product";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchProducts} from "../../store/ProductsSlice";
import Skeleton from "../UI/Skeleton/Skeleton";

const Products = ({category='',limit,rowFilter}) => {
    const dispatch = useDispatch();
    const {data:products, loading, error} = useSelector(state => state.product.product);
 
    useEffect(() => {
            dispatch(fetchProducts({category,limit}))
    },[category])

    return (
        <div className={`grid ${rowFilter?'grid-cols-1':'sm:grid-cols-2 lg:grid-cols-4'} gap-4 mt-4 mx-auto p-3`}>
            {loading?<Skeleton count={8}/>
            :products.map(prod =>{
                return <Product 
                rowFilter={rowFilter}
                key={prod.id} 
                id={prod.id} 
                title={prod.attributes.title} 
                stockLeft={prod.attributes.stockLeft} 
                price={prod.attributes.price}
                img={prod.attributes.image.data.attributes.url}
                ratings={prod.attributes.ratings}
                description={prod.attributes.description}
                />})
            }
        </div>
    )
}

export default Products;