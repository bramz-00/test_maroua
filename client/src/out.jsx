// src/router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/login';
import ProtectedRoute from './components/ProtectedRoute';

// Function to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get('token');
};

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!getAccessToken();
};

// Create the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    index: true,
  },
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
