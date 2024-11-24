import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


import PublicRoutes from "./utils/PublicRoutes";
import ProtectedRoutes from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/auth" element={<PublicRoutes />}>
          <Route path="/auth/login" element={<Login />} />
        </Route>

        {/* Protected routes */}
        <Route path="/user" element={<ProtectedRoutes />}>
          <Route path="/user/home" element={<Home />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Route>

        {/* Redirect to login page if user is not authenticated */}
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
