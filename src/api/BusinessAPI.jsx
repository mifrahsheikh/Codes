import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const businessApi=createApi({
  reducerPath:'businessApi',
  baseQuery: fetchBaseQuery({baseUrl:'http://127.0.0.1:8000/api/'}),
  endpoints:(builder)=>({
    fetchNearbyBusinesses:builder.query({
      query:({lat,lng})=> `nearby/?lat=${lat}&lng=${lng}`
    }),
    
    addBusiness:builder.mutation({
      query:(BusinessData)=>({url:'business/add/',
        method:"POST",
        body:BusinessData,
      }),
    }),
    deleteBusiness:builder.mutation({
      query:(id)=>({
        url:`business/delete/${id}/`,
        method:"DELETE",
      }),
    }),
  }),
});

export const {
  useFetchNearbyBusinessesQuery,
  useAddBusinessMutation,
  useDeleteBusinessMutation,
} = businessApi;