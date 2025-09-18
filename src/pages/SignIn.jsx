import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/AuthAPI";

const SignIn = () => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const myFunction = async () => {
    try {
      const response = await login({
        username: username.current.value,
        password: password.current.value,
      }).unwrap();

      localStorage.setItem("access", response.access);
      localStorage.setItem("refresh", response.refresh);

      navigate("/myprofile");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h1 className="text-5xl text-gray-800 mb-5">Sign In</h1>
      <div className="w-full max-w-md mb-4">
        <label htmlFor="username" className="block mb-2 font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          ref={username}
          className="w-full p-2 border rounded-md focus:ring-blue-400"
        />
      </div>

      <div className="w-full max-w-md mb-6">
        <label htmlFor="password" className="block mb-2 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          ref={password}
          className="w-full p-2 border rounded-md focus:ring-blue-400"
        />
      </div>

      <button
        onClick={myFunction}
        disabled={isLoading}
        className="px-5 py-3 text-white bg-blue-500 rounded-md cursor-pointer transition-colors duration-300 w-full max-w-md hover:bg-blue-700"
      >
        Sign In
      </button>

      {error && (
        <p className="text-red">Invalid username or password.</p>
      )}
    </div>
  );
};

export default SignIn;
