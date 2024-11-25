import React from "react";
import App from "../App";
import Navbar from "../components/Navbar";

const isAuthenticated = window.localStorage.getItem("token");

const AuthenticatedLayout = () => {
  return (
    <div>
      {isAuthenticated ? <Navbar /> : ""}
      <App />
    </div>
  );
};

export default AuthenticatedLayout;
