import { apiSlice } from "@/features/Api/apiSlice";
import { allUsersAPI } from "@/features/user/getAllUsers/getAllUsers";
import { NewUserInput, IUser } from "@/types/client/user.types";

export const registerAdminAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerAdmin: builder.mutation<IUser, NewUserInput>({
      query: (adminData) => ({
        url: "/api/auth/registerAdmin",
        method: "POST",
        body: adminData,
      }),
      // Optimistic update — add the news item immediately in cache
      async onQueryStarted(adminData, { dispatch, queryFulfilled }) {
        // Generate temp ID for the optimistic item
        const tempId = `temp-${Math.random().toString(36).substr(2, 9)}`;

        // Update cached getAllNews queries optimistically
        const patchResult = dispatch(
          allUsersAPI.util.updateQueryData(
            "getAllUsers",
            undefined,
            (draft: IUser[]) => {
              // Add new item at the start of the list (like unshift)
              draft.unshift({
                ...adminData,
                _id: tempId,
                createdAt: new Date(),
              });
            }
          )
        );

        try {
          const { data: newUser } = await queryFulfilled;

          // Replace temp item with real item from server response
          dispatch(
            allUsersAPI.util.updateQueryData(
              "getAllUsers",
              undefined,
              (draft: IUser[]) => {
                const index = draft.findIndex(
                  (item: IUser) => item._id === tempId
                );
                if (index !== -1) draft[index] = newUser;
              }
            )
          );
        } catch {
          // Undo optimistic update on error
          patchResult.undo();
        }
      },
      // Invalidate the news list tag to refetch all queries after mutation
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useRegisterAdminMutation } = registerAdminAPI;
