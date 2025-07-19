import { apiSlice } from "@/features/Api/apiSlice";

export const moveNewsToTrashAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    moveNewsToTrash: builder.mutation({
      query: (selectedIds) => ({
        url: "/api/news/moveNewsToTrash",
        method: "POST",
        body: { selectedIds },
      }),
      // এই অংশটি ক্যাশ আপডেটের জন্য সবচেয়ে গুরুত্বপূর্ণ
      invalidatesTags: (result, error, selectedIds) => [
        ...selectedIds.flatMap((id: string) => [
          { type: "News", id },
          { type: "Trash News", id },
        ]),
        { type: "News", id: "LIST" },
        { type: "Trash News", id: "LIST" },
      ],
    }),
  }),
});

export const { useMoveNewsToTrashMutation } = moveNewsToTrashAPI;
