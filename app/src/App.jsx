import './styles/App.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import AppLayout from './ui/AppLayout';
import ErrorPage from "./ui/ErrorPage";
import Home from "./ui/Home";
import { action as loginAction } from './features/auth/LogIn';
import Menu from './features/menu/Menu';
import { loader as categoryLoader } from './features/menu/Menu';
import Products from './features/products/Products';
import { loader as productLoader } from './features/products/Products';
import CartMenu from './features/cart/CartMenu';
import OrderConfirmation from './features/cart/OrderConfirmation';
import { action as orderAction } from './features/cart/OrderConfirmation';
import OrderedLayout from './features/cart/OrderedLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children:[
      {
        path:'/',
        element:<Home/>,
        action:loginAction,
        errorElement: <ErrorPage />
      },
      {
        path:'/menu',
        element:<Menu/>,
        errorElement: <ErrorPage />,
        loader: categoryLoader,
        children:[
          {
            path:'/menu/:category?',
            element:<Products/>,
            errorElement: <ErrorPage />,
            loader :productLoader
          },
        ]
      },
      {
        path:'/shoplist',
        element:<CartMenu/>,
        errorElement: <ErrorPage />
      },
      {
        path:'/orderconfirmation',
        element:<OrderConfirmation/>,
        errorElement: <ErrorPage />,
        action:orderAction
      },
      {
        path:'/orderedlayout',
        element:<OrderedLayout/>,
        errorElement: <ErrorPage />,
        action:orderAction
      }
    ]
  },
]);

function App() {



  return (      
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
