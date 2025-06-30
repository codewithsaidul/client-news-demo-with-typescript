import { apiSlice } from "@/features/Api/apiSlice";
import { INewsApiResponse } from "@/types/client/news.types";
import { IGetAllNewsParams } from "../../../types/client/news.types";

export const allTrashedNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrashedNews: builder.query<INewsApiResponse, IGetAllNewsParams>({
      query: ({
        page = 1,
        authorEmail = "none",
      }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (authorEmail) params.append("authorEmail", authorEmail);

        return `/api/news/getTrashedNews?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              // tag each news item by its id
              ...result.data.map(({ _id}) => ({
                type: "Trash News" as const,
                id: _id,
              })),
              // also tag the whole list (important for refetching the whole page)
              { type: "Trash News", id: "LIST" },
            ]
          : [{ type: "Trash News", id: "LIST" }],
    }),
  }),
});



export const { useGetAllTrashedNewsQuery } = allTrashedNewsAPI


