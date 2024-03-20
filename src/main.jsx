import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx'

import './styles/base.css'
import './styles/media-576.css'
import './styles/media-768.css'
import './styles/media-992.css'
import './styles/media-1200.css'

// Router components
import Landing from './components/Body/Landing.jsx'
import SignUp from './components/Body/SignUp.jsx'
import SignIn from './components/Body/SignIn.jsx'
import Profile from './components/Body/Profile.jsx'
import SelectFile from './components/Body/SelectFile.jsx'

import 'material-icons/iconfont/material-icons.css';
import Auth from './components/Body/Auth.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/**
 * Browser router donde se agregan las rutas, estas son renderizadas en el Outlet
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/home",
        element: <Landing />,
        default: true
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      // {
      //   path: "/signup",
      //   element: <SignUp />
      // },
      // {
      //   path: "/signin",
      //   element: <SignIn />
      // },
      // {
      //   path: "/profile/", //Aqui se debe de agregar el usuario loggeado de forma dinamica
      //   element: <Profile />
      // },
      {
        path: "/selectFile",
        element: <SelectFile />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
