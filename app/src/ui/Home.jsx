import { useState } from "react";
import { LocalStorageJSONTOKENKEY } from "../utils/SD";
import Login from "../features/auth/LogIn";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [token] = useState(() => {
    return JSON.parse(localStorage.getItem(LocalStorageJSONTOKENKEY));
  });
  let navigate = useNavigate();

  if (token != null) {
    return navigate('./menu')
  }
  return <Login></Login>;
}
