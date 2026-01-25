import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./TokenSlice";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: import.meta.env.VITE_API_LOGIN,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              access: data.access,
              refresh: data.refresh,
              role: data.role || null, 
            })
          );
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),
 forgotPassword: builder.mutation({
      query: (email) => ({
        url: import.meta.env.VITE_AUTH_FORGOT,
        method: "POST",
        body: { email },
      }),
    }),
    signup: builder.mutation({
      query: (newUser) => ({
        url: import.meta.env.VITE_API_SIGNUP,
        method: "POST",
        body: newUser,
      }),
    }),

    refreshToken: builder.mutation({
      query: (refresh) => ({
        url: "api/token/refresh/", 
        method: "POST",
        body: { refresh },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              access: data.access,
              refresh: arg,
            })
          );
        } catch (err) {
          dispatch(logout());  
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
} = authApi;