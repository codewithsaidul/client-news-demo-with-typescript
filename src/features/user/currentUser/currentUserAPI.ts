import { apiSlice } from "@/features/Api/apiSlice";




export const currentUsersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => "/api/user/getCurrentUser"
    }),
  }),
});

export const { useGetCurrentUserQuery } = currentUsersAPI;
