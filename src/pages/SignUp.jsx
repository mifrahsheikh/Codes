import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSignupMutation } from "../api/AuthAPI";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signup, { isLoading, error }] = useSignupMutation();

  // role comes from where user clicked signup (landing → businessuser, category → user)
  const role = location.state?.role || "user";

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "Required";
    if (!values.email) errors.email = "Required";
    if (!values.password) errors.password = "Required";
    if (!values.confirmPassword) errors.confirmPassword = "Required";
    else if (values.password !== values.confirmPassword)
      errors.confirmPassword = "Passwords must match";
    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      await signup({
        username: values.username,
        password: values.password,
        email: values.email,
        role: role,
      }).unwrap();

      alert("Signup successful!");

      if (role === "businessuser") {
        navigate("/businessuser");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={() => navigate("/")}
        >
          ✖
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">
          Sign Up as {role === "businessuser" ? "Business User" : "User"}
        </h1>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
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
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded-md focus:ring-emerald-400"
                />
                <ErrorMessage
                  name="email"
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
                  className="text-red-500 text mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 font-medium"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full p-2 border rounded-md focus:ring-emerald-400"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-5 py-3 text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-emerald-600 cursor-pointer hover:underline"
          >
            Sign in here
          </span>
        </p>

        {error && (
          <p className="text-red-500 mt-2 text-center">
            Signup failed. Try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;