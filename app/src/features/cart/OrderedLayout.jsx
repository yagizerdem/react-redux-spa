import { useNavigate } from "react-router-dom";
export default function OrderedLayout(){
    const navigate = useNavigate()
    function clickHandler(){
        navigate("/menu");
    }
    return(
        <div className="order-layout">
            Your Order request has arrived ...
            <button className="ord-back" onClick={clickHandler}>continue shopping</button> 
        </div>
    )
}