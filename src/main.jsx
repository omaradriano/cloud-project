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
import Landing from './components/Landing.jsx'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'

import 'material-icons/iconfont/material-icons.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from './components/Profile.jsx'

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
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/profile/", //Aqui se debe de agregar el usuario loggeado de forma dinamica
        element: <Profile />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
