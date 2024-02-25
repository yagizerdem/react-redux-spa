import "../../styles/products.css";
import { useParams , useLoaderData } from 'react-router-dom';
import { getProducts } from "../../services/apiFakeStore";

export default function Products(){
    const products = useLoaderData();   
    
    return(
        <div className="products-container">
            Products
        </div>
    )
}

export async function  loader({request , params}){
    const {category} = params
    const data = await getProducts(category)
    return data
}