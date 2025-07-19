import { apiSlice } from "@/features/Api/apiSlice";


export const updateNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateNews: builder.mutation({
      query: ({ id, newsData }) => ({
        url: `/api/news/updateNews/${id}`,
        method: "PATCH",
        body: newsData,
      }),
      invalidatesTags: (result) => result ? [{ type: "News", id: result._id }] : [],
    }),
  }),
});

export const { useUpdateNewsMutation } = updateNewsAPI;
