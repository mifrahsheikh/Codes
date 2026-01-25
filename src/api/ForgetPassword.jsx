import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "./AuthAPI";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await forgotPassword(email).unwrap();
      alert(response.detail); 
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err?.data?.email || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h1 className="text-3xl mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-md p-2 border rounded-md mb-4"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="px-5 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 w-full max-w-md"
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
};

export default ForgotPassword;
