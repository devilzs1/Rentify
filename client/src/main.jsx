import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from './App.jsx'
import './index.css'

import store from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HelmetProvider>
  <ReduxProvider store = {store}>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
  </HelmetProvider>
  </React.StrictMode>,
)
