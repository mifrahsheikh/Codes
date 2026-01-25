import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { setCredentials } from "../api/TokenSlice";
import { useLoginMutation } from "../api/AuthAPI";

const SignIn = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      const response = await login({
        username: values.username,
        password: values.password,
      }).unwrap();

      if (response.access) {
        localStorage.setItem("access", response.access);
        localStorage.setItem("refresh", response.refresh);
        localStorage.setItem("role", response.role);

        dispatch(
          setCredentials({
            access: response.access,
            refresh: response.refresh,
            role: response.role,
          })
        );

        if (response.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/businessuser");
        }
      }
    } catch (err) {
      console.error("Login failed:", err?.data || err?.error || err);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={() => navigate("/")}
        >
          ✖
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">
          Sign In
        </h1>

        <Formik
          initialValues={{ username: "", password: "" }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-1 font-medium">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border rounded-md focus:ring-emerald-400"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 font-medium">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border rounded-md focus:ring-emerald-400"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />

                <p
                  onClick={() => navigate("/forgot-password")}
                  className="mt-2 text-sm text-emerald-600 cursor-pointer hover:underline"
                >
                  Forgot Password?
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="admin" className="font-medium">
                  Sign in as Admin
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-5 py-3 text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-emerald-600 cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>

        {error && (
          <p className="text-red-500 mt-2 text-center">
            Invalid username or password.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;