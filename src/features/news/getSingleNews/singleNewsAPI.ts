import { apiSlice } from "@/features/Api/apiSlice";
import { INews } from "@/types/client/news.types";

export const singleNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleNews: builder.query<INews, string>({
      query: (slug) => `/api/news/allNews/${slug}`,
      providesTags: (result) =>
        result ? [{ type: "News", id: result._id }] : [],
    }),
  }),
});

export const { useGetSingleNewsQuery } = singleNewsAPI;
