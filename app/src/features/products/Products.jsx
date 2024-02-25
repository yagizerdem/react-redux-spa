import "../../styles/products.css";
import { useParams , useLoaderData } from 'react-router-dom';
import { getProducts } from "../../services/apiFakeStore";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

export default function Products(){
    const  {cart} = useSelector((state) => state.cart)
    const products = useLoaderData();   
    return(
        <div className="products-container">
            {products.length == 0 ?
            <div className="select-category-warning">Select category to list products ... </div>:
            (
                <div className="product-item-container">
                    {
                        products.map((item , i) =>(
                            <ProductItem key={i} data={item} allCart={cart}></ProductItem>
                        ))
                    }
                </div>
            )
        }
        </div>
    )
}

export async function  loader({request , params}){
    const {category} = params
    const data = await getProducts(category)
    return data
}