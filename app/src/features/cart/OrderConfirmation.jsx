import { Form } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAddress } from "../../services/apiGeocoding";
import { redirect } from "react-router-dom";
import { validateEmail } from "../../utils/Validate";
import store from "../../store";
import { clearCart } from "./cartslice";
export default function OrderConfirmation() {
  const [error, setError] = useState(null);
  const [location, setLocation] = useState([]);
  const { data } = useSelector((state) => state.user);
  const inputRef = useRef();
  function clickHandler(e) {
    e.preventDefault()
    if (!navigator.geolocation) {
      setError("your browser not support geo location api");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation([latitude, longitude]);
      }, error);
    }
  }
  useEffect(() => {
    if (location.length == 0) return;
    async function getAddress_() {
      const result = await getAddress({
        latitude: location[0],
        longitude: location[1],
      });
      inputRef.current.value = `${result.continent} ${result.countryName} ${result.city} ${result.locality}`;
    }
    getAddress_();
  }, [location]);
  return (
    <div className="order-container">
      <Form className="form" action="/orderconfirmation" method="post">
        <label>first name</label>
        <input
          placeholder="enter your first name"
          defaultValue={data.name?.firstname}
          name='firsname'
        ></input>
        <label>last name</label>
        <input
          placeholder="enter your last name"
          defaultValue={data.name?.lastname}
          name='lastname'
        ></input>
        <label>email</label>
        <input placeholder="enter your email" defaultValue={data.email} name='email'></input>
        <input placeholder="enter your address" ref={inputRef} name='address'></input>
        <button className="btn-findlocation" onClick={(e)=>clickHandler(e)}>
          use current location
        </button>
        <button className="fire-order" type="submit">
          Order
        </button>
      </Form>
    </div>
  );
}

export async function action({request }){
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const {firsname, lastname, email, address} = data

    const error = {}
    if(firsname.trim() == '' ||lastname.trim() == ''){
        error.username = "invalid first name or last name"
    }
    if(!validateEmail(email)){
        error.email = "invalid email"
    }
    if(address.trim() == ''){
        error.address = "invalid address"
    }
    if(Object.keys(error).length > 0){
        console.log(error)
        alert(`${error.username ?? ''}  ,  ${error.email ?? ''} ,  ${error.address ?? ''}`)
        return null
    }
    store.dispatch(clearCart())

    return redirect('/orderedlayout')
}
