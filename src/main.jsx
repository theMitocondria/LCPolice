import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Data from './Data.jsx';
import './index.css';
import TelegramSolutionContext from './Context/TelegramSolContext.jsx'; // Correctly import the context provider
import Header from './Header.jsx';
import { Analytics } from '@vercel/analytics/react';
import Pagination from './Components/Pagination.jsx';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <App />
    </>
  },
  {
    path: '/:name/Cheaters',
    element: <>
      <Header />
      <Data />  
    </>,
    children: [
      {
        path: '3',
        element: <div>Question 3 Content</div>
      },
      {
        path: '4',
        element: <div>Question 4 Content</div>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <TelegramSolutionContext>
    <RouterProvider router={AppRouter} />
    <Analytics />
  </TelegramSolutionContext>
);
