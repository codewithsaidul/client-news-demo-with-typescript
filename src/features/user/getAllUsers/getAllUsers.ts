import { apiSlice } from "@/features/Api/apiSlice";
import { IUser } from "@/types/client/user.types";

export const allUsersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => "/api/user/getAllUsers",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Users" as const, id: _id })),
              // also tag the whole list (important for refetching the whole page)
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useGetAllUsersQuery } = allUsersAPI;
