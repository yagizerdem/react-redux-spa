import Button from "../../ui/Button"
import { useDispatch } from "react-redux";
import { addCartItem } from "../cart/cartslice";
import YieldComponent from "../cart/YieldComponent";
export default function ProductItem({data , allCart}){
    const dispatch = useDispatch()
    function handleClick(item){
        dispatch(addCartItem(item))
    }
    var isInCart = allCart.findIndex((cart) => {
        return cart.category == data.category && cart.id == data.id;
    });


    const buttonStyle = {margin:'20px 0',width:'150px' , height:'40px' , backgroundColor:'var(--MediumPurple)' , 
    color:'#fff',cursor:'pointer',textAlign:'center' , fontWeight:'bolder'}
    return(
        <div className="product-item"> 
             <img src={data.image} alt="product img"></img>
             <hr/>
             <h3>{data.title}</h3>
             <div className="description">
                <span>description : </span>
                <p>
                {data.description}
                </p>
             </div>
             {isInCart >= 0?
             <YieldComponent count={allCart[isInCart]?.quantity} id={data.id} category={data.category}></YieldComponent> : 
             <Button type={buttonStyle} onClick={()=>handleClick(data)}>Buy Item</Button>}

        </div>
    )
}
