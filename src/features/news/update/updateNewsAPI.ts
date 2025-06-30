import { apiSlice } from "@/features/Api/apiSlice";


export const updateNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateNews: builder.mutation({
      query: ({ slug, newsData }) => ({
        url: `/api/news/updateNews/${slug}`,
        method: "PATCH",
        body: newsData,
      }),
      invalidatesTags: (result) => result ? [{ type: "News", id: result._id }] : [],
    }),
  }),
});

export const { useUpdateNewsMutation } = updateNewsAPI;
