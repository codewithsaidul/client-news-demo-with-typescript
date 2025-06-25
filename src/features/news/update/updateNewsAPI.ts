import { apiSlice } from "@/features/Api/apiSlice";


export const updateNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateNews: builder.mutation({
      query: ({ slug, newsData }) => ({
        url: `/api/news/updateNews/${slug}`,
        method: "PATCH",
        body: newsData,
      }),
      invalidatesTags: (result, error, {slug}) => [
        { type: "News", id: slug }, // the deleted news item tag
        { type: "News", id: "LIST" }, // the overall news list tag
      ],
    }),
  }),
});

export const { useUpdateNewsMutation } = updateNewsAPI;
