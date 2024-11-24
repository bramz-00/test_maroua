

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isAuthenticated = window.localStorage.getItem('token');
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};


export default ProtectedRoutes;

