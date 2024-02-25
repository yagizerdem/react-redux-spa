import { useSelector } from "react-redux";
import { getAllCategory } from "../../services/apiFakeStore";
import { useLoaderData , Outlet } from "react-router-dom";
import "../../styles/menu.css";
import Button from "../../ui/Button";


export default function Menu() {
  const allCategory = useLoaderData();
  function switchCategoryHandler(){
    
  }

  return (
    <div className="menu-container">
      <section>
        <nav className="nav-category">
          {allCategory.map((item) => (
            <Button onClick={switchCategoryHandler} key={item}>{item}</Button>
          ))}
        </nav>
        <Outlet></Outlet>
      </section>
    </div>
  );
}

export async function loader() {
  const menu = await getAllCategory();
  return menu;
}
