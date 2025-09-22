import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/password-reset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRef.current.value }),
      });

      if (response.ok) {
        alert("Password reset link sent! Check your email.");
        navigate("/signin");
      } else {
        let errorMessage = "Email not found!";
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.detail || JSON.stringify(errorData);
        } catch {
          console.error("Non-JSON error:", text);
        }
        alert(errorMessage);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h1 className="text-3xl mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        ref={emailRef}
        className="w-full max-w-md p-2 border rounded-md mb-4"
      />
      <button
        onClick={handleSubmit}
        className="px-5 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 w-full max-w-md"
      >
        Send Reset Link
      </button>
    </div>
  );
};
export default ForgotPassword;