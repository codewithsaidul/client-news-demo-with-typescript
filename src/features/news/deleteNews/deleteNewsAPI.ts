import { apiSlice } from "@/features/Api/apiSlice";


export const deleteNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteNews: builder.mutation({
      query: (slug) => ({
        url: `/api/news/removeNews/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, slug) => [
        { type: "News", slug }, // the deleted news item tag
        { type: "News", slug: "LIST" }, // the overall news list tag
      ],
    }),
  }),
});

export const { useDeleteNewsMutation } = deleteNewsAPI;
