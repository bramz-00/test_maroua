import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  const isAuthenticated = window.localStorage.getItem('token');
  
  // If the user is not authenticated, show public routes (like login)
  // If authenticated, redirect to home
  return !isAuthenticated ? <Outlet /> : <Navigate to="/user/home" />;
};

export default PublicRoutes;