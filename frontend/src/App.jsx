import HomePage from "./routes/homepage/HomePage.jsx"
import ListPage from "./routes/listPage/ListPage.jsx";
import {Layout, RequiredAuth } from "./layout/Layout.jsx";
//routing
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import SinglePage from "./routes/singlePage/SinglePage.jsx";
import Register from "./routes/register/Register.jsx";
import Login from "./routes/login/Login.jsx";
import Profile from "./routes/profile/Profile.jsx";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage.jsx";
import NewPostPage from "./routes/newPostPage/NewPostPage.jsx";
import Contact from "./routes/contact/Contact.jsx";
import { singlePageLoader,listPageLoader, profilePageLoader, contactPageLoader } from "./lib/loader.js";
import DeveloperContact from "./routes/DeveloperContact/DeveloperContact.jsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<HomePage/>,
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader,
        },
        {
          path:"/register",
          element:<Register/>,
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/contact",
          element:<Contact/>,
          loader:contactPageLoader,
        },
        {
          path:"/dev",
          element:<DeveloperContact/>,
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader:singlePageLoader,
        }
      ]
    },
    {
      path:"/",
      element:<RequiredAuth/>,
      children:[
        {
          path:"/profile",
          element:<Profile/>,
          loader:profilePageLoader
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
          element:<NewPostPage/>
        }
      ]
    }
  ]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
