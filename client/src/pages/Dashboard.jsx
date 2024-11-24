// src/components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
 
  return (
    <div>
      <h1>Your To-Do List</h1>
      <p>Here are your tasks:</p>
      {/* Add your existing to-do logic here */}
   
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Dashboard;
