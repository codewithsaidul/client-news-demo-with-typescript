import { apiSlice } from "@/features/Api/apiSlice";
import { INewsApiResponse } from "@/types/client/news.types";
import { IGetAllNewsParams } from "../../../types/client/news.types";

export const allNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query<INewsApiResponse, IGetAllNewsParams>({
      query: ({
        page = 1,
        category,
        newsType,
        priority = "none",
        authorEmail = "none",
      }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (category) params.append("category", category);
        if (newsType) params.append("newsType", newsType);
        if (priority) params.append("priority", priority);
        if (authorEmail) params.append("authorEmail", authorEmail);

        return `/api/news/allNews?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              // tag each news item by its id
              ...result.data.map(({ slug }) => ({
                type: "News" as const,
                id: slug,
              })),
              // also tag the whole list (important for refetching the whole page)
              { type: "News", id: "LIST" },
            ]
          : [{ type: "News", id: "LIST" }],
    }),
  }),
});

export const { useGetAllNewsQuery } = allNewsAPI;
