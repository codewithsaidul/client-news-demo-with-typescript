import { apiSlice } from "@/features/Api/apiSlice";
import { INews } from "@/types/client/news.types";

export const getSingleDraftAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleDraft: builder.query<INews, string>({
      query: (slug) => `/api/news/getAllDraft/${slug}`,
      providesTags: (result) =>
        result ? [{ type: "Draft", id: result._id }] : [],
    }),
  }),
});

export const { useGetSingleDraftQuery } = getSingleDraftAPI;