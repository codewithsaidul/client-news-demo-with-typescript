import { apiSlice } from "@/features/Api/apiSlice";




export const searchNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchNews: builder.query({
      query: ({ searchTerm, page = 1 }) => `/api/news/search?s=${encodeURIComponent(searchTerm)}&page=${page}`,
    }),
  }),
});


export const { useGetSearchNewsQuery } = searchNewsAPI