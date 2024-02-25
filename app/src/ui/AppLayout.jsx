import { Outlet , useNavigation } from "react-router-dom"
import Loader from "./Loader";

export default function AppLayout(){
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
  

    return(
        <div>
            {isLoading && <Loader></Loader>}
            <Outlet></Outlet>
        </div>
    )
}