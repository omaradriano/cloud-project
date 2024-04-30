import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/base.css'
import './styles/media-576.css'
import './styles/media-768.css'
import './styles/media-992.css'
import './styles/media-1200.css'

import 'material-icons/iconfont/material-icons.css';

import {
  RouterProvider
} from "react-router-dom";

import router from './Router/Router.jsx'
/**
 * Browser router donde se agregan las rutas, estas son renderizadas en el Outlet
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
