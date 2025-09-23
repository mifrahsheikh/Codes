import { configureStore } from '@reduxjs/toolkit'
import { businessApi } from './api/BusinessAPI'
import { authApi } from './api/AuthAPI'
import authReducer from './api/TokenSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(businessApi.middleware, authApi.middleware),
});