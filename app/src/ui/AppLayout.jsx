import { Outlet , useNavigation } from "react-router-dom"

export default function AppLayout(){
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
  

    return(
        <div>
            {isLoading && <div>loader</div>}
            <Outlet></Outlet>
        </div>
    )
}