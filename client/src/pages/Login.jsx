// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous error message
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/users/login', { email, password }, { withCredentials: true });

      // Handle success (token will be stored in cookie by the server)
      Swal.fire({
        position: "top",
        icon: "success",
        toast:true,
        title: response.data.message,
        showConfirmButton: false,
        timer: 1000
      });
      window.localStorage.setItem('token',response.data.token)
     setTimeout(()=>{
      window.location.href = '/home'; 
     },1300) // Example redirection to the dashboard page
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        // setErrorMessage(error.response.data.message || 'An error occurred during login.');
        Swal.fire({
          position: "top",
          icon: "error",
          toast:true,
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        setErrorMessage('Unable to reach the server. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isLoading ? 'opacity-50' : ''}`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</a></p>
        </div>
      </div>

      
    </div>
  );
};

export default Login;
