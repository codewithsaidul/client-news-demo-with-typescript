import { apiSlice } from "@/features/Api/apiSlice";
import { INewsApiResponse } from "@/types/client/news.types";
import { IGetAllNewsParams } from "../../../types/client/news.types";

export const getAllDraftAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDrat: builder.query<INewsApiResponse, IGetAllNewsParams>({
      query: ({
        page = 1,
        authorEmail = "none",
      }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (authorEmail) params.append("authorEmail", authorEmail);

        return `/api/news/getAllDraft?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              // tag each news item by its id
              ...result.data.map(({ _id }) => ({
                type: "Draft" as const,
                id: _id,
              })),
              // also tag the whole list (important for refetching the whole page)
              { type: "Draft", id: "LIST" },
            ]
          : [{ type: "Draft", id: "LIST" }],
    }),
  }),
});

export const { useGetAllDratQuery } = getAllDraftAPI;
