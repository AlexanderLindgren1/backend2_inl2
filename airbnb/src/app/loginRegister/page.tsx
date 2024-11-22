"use client"
import React, { useState } from 'react';

import Login from '../component/Login';
import Register from '../component/Register';
const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleLoginClick = () => {
      setIsLogin(true);
    };

    const handleRegisterClick = () => {
      setIsLogin(false);
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Login/Register</h1>
          <div className="flex flex-col items-center justify-center h-screen">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={handleRegisterClick}
            >
              Register
            </button>
            {isLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    );
};

export default LoginRegister;
