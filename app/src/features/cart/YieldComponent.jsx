import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateCartItem , removeCartItem } from "./cartslice";
export default function YieldComponent({ count, id, category }) {
  const dispatch = useDispatch();
  function clickHandler(amount) {
    dispatch(updateCartItem({ id, category, amount }));
  }
  function clearAll(){
    dispatch(removeCartItem({ id, category }));
  }
  const buttonStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
    diplay:'flex',
    alignItems:'center',
    justifyContent:'center',
};
  return (
    <>
      <div className="yield-compoennt">
        <Button type={buttonStyle} onClick={() => clickHandler(-1)}>
          -
        </Button>
        <span>{count && count}</span>
        <Button type={buttonStyle} onClick={() => clickHandler(+1)}>
          +
        </Button>
        <br />
      </div>
      <Button type={{...buttonStyle , borderRadius:'none' , width:'100px' , marginTop:'20px'}} onClick={clearAll}>Clear all</Button>
    </>
  );
}
