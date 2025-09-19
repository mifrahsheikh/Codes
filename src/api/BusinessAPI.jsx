import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const businessApi = createApi({
  reducerPath: "businessApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["PendingBusinesses", "ApprovedBusinesses"],
  endpoints: (builder) => ({
    fetchNearbyBusinesses: builder.query({
      query: ({ lat, lng }) =>
        `${import.meta.env.VITE_API_FETCH_NEARBY}?lat=${lat}&lng=${lng}`,
    }),
    addBusiness: builder.mutation({
      query: (businessData) => ({
        url: import.meta.env.VITE_API_ADD_BUSINESS,
        method: "POST",
        body: businessData,
      }),
      invalidatesTags: ["PendingBusinesses"],
    }),
    deleteBusiness: builder.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_API_DELETE_BUSINESS}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["PendingBusinesses", "ApprovedBusinesses"],
    }),
    getPendingBusinesses: builder.query({
      query: () => import.meta.env.VITE_API_PENDING_BUSINESS,
      providesTags: ["PendingBusinesses"],
    }),
    approveBusiness: builder.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_API_APPROVE_BUSINESS}${id}/`,
        method: "POST",
      }),
      invalidatesTags: ["PendingBusinesses", "ApprovedBusinesses"],
    }),
    getApprovedBusinesses: builder.query({
      query: () => import.meta.env.VITE_API_APPROVED_BUSINESSES, 
      providesTags: ["ApprovedBusinesses"],
    }),
    getBusinesses: builder.query({
      query: () => import.meta.env.VITE_API_USER_BUSINESSES, 
      providesTags: ["ApprovedBusinesses"],
    }),
  }),
});

export const {
  useFetchNearbyBusinessesQuery,
  useAddBusinessMutation,
  useDeleteBusinessMutation,
  useGetPendingBusinessesQuery,
  useApproveBusinessMutation,
  useGetApprovedBusinessesQuery,
  useGetBusinessesQuery, 
} = businessApi;