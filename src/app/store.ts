import { apiSlice } from '@/features/Api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});