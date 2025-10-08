import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { setCredentials } from "../api/TokenSlice";
import { useLoginMutation } from "../api/AuthAPI";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleFromState = location.state?.role || (location.state?.fromLandingPage ? "user" : "user");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "Required";
    if (!values.password) errors.password = "Required";
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
        localStorage.setItem("username", values.username);

        if (response.role === "admin") navigate("/admin");
        else if (response.role === "businessuser") navigate("/businessuser");
        else navigate("/user");
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
          Sign In as {roleFromState === "businessuser" ? "Business" : "User"}
        </h1>

        <Formik initialValues={{ username: "", password: "" }} validate={validate} onSubmit={handleSubmit}>
          <Form className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">Username</label>
              <Field type="text" id="username" name="username" className="w-full p-2 border rounded-md focus:ring-emerald-400" />
              <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <Field type="password" id="password" name="password" className="w-full p-2 border rounded-md focus:ring-emerald-400" />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />

              <p onClick={() => navigate("/forgot-password")} className="mt-2 text-sm text-emerald-600 cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>

            <button type="submit" disabled={isLoading} className="w-full px-5 py-3 text-white bg-emerald-600 rounded-md hover:bg-emerald-700">
              Sign In
            </button>
          </Form>
        </Formik>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => {

              const role =
                location.state?.fromLandingPage || roleFromState === "user"
                  ? "user"
                  : "businessuser";
              navigate("/signup", { state: { role, fromLandingPage: location.state?.fromLandingPage } });
            }}
            className="text-emerald-600 cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>

        {error && (
          <p className="text-red-500 mt-2 text-center">
            {error?.data?.detail || "Invalid username or password."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;