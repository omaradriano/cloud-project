import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './styles/base.css'
import './styles/media-576.css'
import './styles/media-768.css'
import './styles/media-992.css'
import './styles/media-1200.css'

import 'material-icons/iconfont/material-icons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
