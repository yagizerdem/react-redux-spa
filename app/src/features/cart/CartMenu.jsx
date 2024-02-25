import Button from "../../ui/Button";
import { useSelector ,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductItem from "../products/ProductItem";
import YieldComponent from "./YieldComponent";
import { updateCartItem } from "./cartslice";

export default function CartMenu() {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function goBack() {
    navigate("/menu");
  }
  function continue_(){
    navigate("/orderconfirmation")
  }
  function clickHandler({amount, category , id}){
    dispatch(updateCartItem({id , category,amount}))
  }

  const buttonStyle = {
    border: "none",
    background: "none",
    padding: "0",
    margin: "10px",
    font: "inherit",
    cursor: "pointer",
    outline: "none",
    color: "var(--MediumPurple)",
    textDecoration: "underline",
  };
  return (
    <div className="cart-menu">
      <nav>
        <Button onClick={goBack} type={buttonStyle}>
          Go back
        </Button>
        {cart.length > 0 &&(
                    <Button onClick={continue_} type={{...buttonStyle , marginLeft:'390px'}}>
                    Continue
                  </Button>
        )}

      </nav>
      {cart.length == 0 ? (
        <div className="empty-basket">Your basket is empty ... </div>
      ) : (
        <div className="all-cart-list">
          <ul>
            {cart.map((item, i) => (
              <>
                <li key={i}>
                  <div className="row">
                    <img src={item.imgurl}></img>
                    <span className="item-title">{item.title}</span>
                    <span className="quantity">
                      {`quantity : ${item.quantity} `}
                    </span>
                    <span className="unit-price">
                      {`unit price : ${item.unitPrice} `}
                    </span>
                    <span className="total-price">
                      {`total price : ${item.unitPrice * item.quantity} `}
                    </span>
                    <span>
                      <div className="btns">
                        <div className="minus" onClick={()=>clickHandler({amount:-1 , category:item.category , id:item.id})}>-</div>
                        <div className="plus" onClick={()=>clickHandler({amount:1 , category:item.category , id:item.id})}>+</div>
                      </div>
                    </span>
                  </div>
                </li>
                <hr></hr>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
