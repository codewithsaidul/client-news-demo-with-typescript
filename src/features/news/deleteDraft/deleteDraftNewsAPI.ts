import { apiSlice } from "@/features/Api/apiSlice";

export const deleteDraftNewsAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteDraftNews: builder.mutation({
      query: (selectedIds) => ({
        url: "/api/news/deleteDraft",
        method: "DELETE",
        body: { selectedIds }, 
      }),
      // এই অংশটি ক্যাশ আপডেটের জন্য সবচেয়ে গুরুত্বপূর্ণ
      invalidatesTags: (result, error, selectedIds) => [
        // যে আইটেমগুলো ডিলিট হয়েছে, সেগুলোর প্রত্যেকটির ট্যাগকে ইনভ্যালিডেট করা হচ্ছে
        ...selectedIds.map((id: string) => ({ type: "Draft", id })),
        { type: "Draft", id: "LIST" },
      ],
    }),

  }),
});


export const { useDeleteDraftNewsMutation } = deleteDraftNewsAPi


