import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorPage from './ErrorPage/ErrorPage.jsx'

import './styles/base.css'
import './styles/media-576.css'
import './styles/media-768.css'
import './styles/media-992.css'
import './styles/media-1200.css'

// Router components
import Landing from './Body/Landing.jsx'
import SelectFile from './Body/SelectFile.jsx'
import Auth from './Body/Auth.jsx'

import 'material-icons/iconfont/material-icons.css';

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
