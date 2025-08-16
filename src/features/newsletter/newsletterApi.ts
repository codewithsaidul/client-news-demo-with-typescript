import { apiSlice } from "@/features/Api/apiSlice";
import { INewsletterParams, INewsletterResponse } from "@/types/client";

export const newsletterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewsletter: builder.query<INewsletterResponse, INewsletterParams>({
      query: (page) => `/api/newsletter/getAllNewsletter?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              // tag each news item by its id
              ...result.data.map(({ _id }) => ({
                type: "Newsletter" as const,
                id: _id,
              })),
              // also tag the whole list (important for refetching the whole page)
              { type: "Newsletter", id: "LIST" },
            ]
          : [{ type: "Newsletter", id: "LIST" }],
    }),

    addNewsletter: builder.mutation({
      query: (newsletter) => ({
        url: "/api/newsletter/addNewsLetter",
        method: "POST",
        body: newsletter,
      }),

      // Invalidate the news list tag to refetch all queries after mutation
      invalidatesTags: [{ type: "Newsletter", id: "LIST" }],
    }),

    deleteNewsLetter: builder.mutation({
      query: (selectedIds) => ({
        url: "/api/newsletter/deleteNewsletter",
        method: "DELETE",
        body: { selectedIds },
      }),

      // এই অংশটি ক্যাশ আপডেটের জন্য সবচেয়ে গুরুত্বপূর্ণ
      invalidatesTags: (result, error, selectedIds) => [
        // যে আইটেমগুলো ডিলিট হয়েছে, সেগুলোর প্রত্যেকটির ট্যাগকে ইনভ্যালিডেট করা হচ্ছে
        ...selectedIds.map((id: string) => ({ type: "Newsletter", id })),
        { type: "Newsletter", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetAllNewsletterQuery, useAddNewsletterMutation, useDeleteNewsLetterMutation } =
  newsletterApi;
