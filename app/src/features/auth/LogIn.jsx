import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.css";
import { Form, useLocation, redirect } from "react-router-dom";
import { LocalStorageJSONTOKENKEY } from "../../utils/SD";
import Button from "../../ui/Button";
import { buttonTypes } from "../../utils/SD";
import { validatePhone, validateEmail } from "../../utils/Validate";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../../store";
import { updateError, createUserObject, updateUser } from "../user/userSlice";
import { userSignIn } from "../../services/apiFakeStore";

export default function Login() {
  const { error } = useSelector((state) => state.user);
  const notify = (errormsg) => toast(errormsg);

  useEffect(() => {
    if (error.trim("") !== "") {
      notify(error);
    }
  }, [error]);

  return (
    <>
      <ToastContainer />
      <div className="login-card">
        <header>Store Login</header>
        <hr />
        <Form method="post" action="/">
          <div className="form-container">
            <label>first name</label>
            <input
              type="text"
              name="firstname"
              placeholder="enter first name"
            />
            <label>last name</label>
            <input type="text" name="lastname" placeholder="enter last name" />
            <label>password</label>
            <input type="text" name="password" placeholder="enter password" />
            <label>email</label>
            <input type="text" name="email" placeholder="enter email" />
            <label>phone</label>
            <input type="text" name="phone" placeholder="enter phone" />
            <Button disabled={false} type={buttonTypes.info}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const { firstname, lastname, password, email, phone } = data;

  const error = {};
  if (!validatePhone(phone)) {
    error.phone = "invalid phoen number";
  }
  if (!validateEmail(email)) {
    error.email = "invalid email address";
  }
  if (Object.keys(error).length > 0) {
    store.dispatch(updateError(`${error.email ?? ""} ${error.phone ?? ""} `));
    return redirect("/");
  }
  const user = createUserObject({
    firstname,
    lastname,
    password,
    email,
    phone,
  });
  const result = await userSignIn(user);

  user.id = result.id;
  store.dispatch(updateUser(user));
  localStorage.setItem(LocalStorageJSONTOKENKEY, Math.random() * 99999); // fake json token key

  return redirect("/menu");
}
