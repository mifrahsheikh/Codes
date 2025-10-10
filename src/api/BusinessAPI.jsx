import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const businessApi = createApi({
  reducerPath: "businessApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL,
     prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
   }),
  tagTypes: ["PendingBusinesses", "ApprovedBusinesses"],
  endpoints: (builder) => ({
    fetchNearbyBusinesses: builder.query({
  query: ({ lat, lng }) =>
    `${import.meta.env.VITE_API_FETCH_NEARBY}?lat=${lat}&lng=${lng}`,
}),
    addBusiness: builder.mutation({
      query: (formData) => ({
        url: import.meta.env.VITE_API_ADD_BUSINESS,
        method: "POST",
        body: formData,
      }),
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
    getMyBusinesses: builder.query({
  query: () => import.meta.env.VITE_API_BUSINESS_USERS, 
}),
    updateBusiness: builder.mutation({
  query: ({ id, formData }) => ({
    url: `${import.meta.env.VITE_API_UPDATE_BUSINESS}${id}/`,
    method: "PATCH",
    body: formData,
    formData: true,
  }),
  invalidatesTags: ["ApprovedBusinesses"],
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
  useUpdateBusinessMutation,
  useGetMyBusinessesQuery,
} = businessApi;