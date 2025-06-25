import { apiSlice } from "@/features/Api/apiSlice";


export const updateUserAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/api/user/updateUser/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: (result, error, {id}) => [
        { type: "Users", id }, // the deleted Users item tag
        { type: "Users", id: "LIST" }, // the overall news list tag
      ],
    }),
  }),
});

export const { useUpdateUserMutation } = updateUserAPI;
