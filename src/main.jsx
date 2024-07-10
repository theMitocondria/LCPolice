import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Data from './Data.jsx'


const AppRouter = createBrowserRouter([
  {
    path : '/',
    element : <App />
  },
  {
    path : '/data',
    element : <Data />
  }

])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={AppRouter} />);