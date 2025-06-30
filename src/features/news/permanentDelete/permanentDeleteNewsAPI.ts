import { apiSlice } from "@/features/Api/apiSlice";

export const permanentDeleteNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    permanentDeleteNews: builder.mutation({
      query: (selectedIds) => ({
        url: "/api/news/permanentDelete",
        method: "DELETE",
        body: { selectedIds }, 
      }),
      // এই অংশটি ক্যাশ আপডেটের জন্য সবচেয়ে গুরুত্বপূর্ণ
      invalidatesTags: (result, error, selectedIds) => [
        // যে আইটেমগুলো ডিলিট হয়েছে, সেগুলোর প্রত্যেকটির ট্যাগকে ইনভ্যালিডেট করা হচ্ছে
        ...selectedIds.map((id: string) => ({ type: "Trash News", id })),
        { type: "Trash News", id: "LIST" },
      ],
    }),

  }),
});


export const { usePermanentDeleteNewsMutation } = permanentDeleteNewsAPI


