import { useSelector } from "react-redux";
import { getAllCategory } from "../../services/apiFakeStore";
import { useLoaderData , Outlet , useNavigate } from "react-router-dom";
import "../../styles/menu.css";
import Button from "../../ui/Button";
import BasketIcon from "../../ui/BasketIcon";


export default function Menu() {
  const allCategory = useLoaderData();
  const navigate = useNavigate()
  
  const buttonSytle = {cursor:'pointer', textDecoration:'underline' , color:'var(--PurplePain)' ,border:'none' , outline:'none',background:'none'}
  function switchCategoryHandler(category){
      navigate(`/menu/${category}`)
  }
  function handleClick(){
    navigate(`/shoplist`)
  }
  return (
    <div className="menu-container">
      <section>
        <nav className="nav-category">
          {allCategory.map((item) => (
            <Button onClick={()=>switchCategoryHandler(item)} key={item} type={buttonSytle}>{item}</Button>
          ))}
        </nav>
        <Outlet></Outlet>

      </section>
      <BasketIcon onClick={handleClick}></BasketIcon>
    </div>
  );
}

export async function loader() {
  const menu = await getAllCategory();
  return menu;
}
