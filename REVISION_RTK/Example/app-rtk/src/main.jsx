import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import App from './App.jsx'
import Login from './pages/Login.jsx'
import Pastry from './pages/Pastry.jsx'

import { store } from './features/index.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/pastries",
    element: <Pastry />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
