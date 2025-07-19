import { apiSlice } from "@/features/Api/apiSlice";
import {
  IAddNewsForm,
  IGetAllNewsParams,
  INews,
  INewsApiResponse,
} from "@/types/client/news.types";
import { getAllDraftAPI } from "../getAllDraft/getAllDraftAPI";

interface AddNewsResponse {
  acknowledged: boolean;
  data: INews;
}

export const addDraftAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDraft: builder.mutation<AddNewsResponse, IAddNewsForm>({
      query: (newsData) => ({
        url: "/api/news/addDraftNews",
        method: "POST",
        body: newsData,
      }),
      // Optimistic update — add the news item immediately in cache
      async onQueryStarted(newsData, { dispatch, queryFulfilled }) {
        const queryArgs: IGetAllNewsParams = {};
        // Generate temp ID for the optimistic item
        const tempId = `temp-${Math.random().toString(36).substr(2, 9)}`;

        // Update cached getAllNews queries optimistically
        const patchResult = dispatch(
          getAllDraftAPI.util.updateQueryData(
            "getAllDrat",
            queryArgs,
            (draft: INewsApiResponse) => {
              // Add new item at the start of the list (like unshift)
              draft.data.unshift({
                ...newsData,
                _id: tempId,
                slug: "Temporary SLug",
                createdAt: new Date(),
              });
            }
          )
        );

        try {
          const response = await queryFulfilled;
          const newNews = response.data.data;

          // Replace temp item with real item from server response
          dispatch(
            getAllDraftAPI.util.updateQueryData(
              "getAllDrat",
              queryArgs,
              (draft: INewsApiResponse) => {
                const index = draft.data.findIndex(
                  (item) => item._id === tempId
                );
                if (index !== -1) draft.data[index] = newNews;
              }
            )
          );
        } catch {
          // Undo optimistic update on error
          patchResult.undo();
        }
      },
      // Invalidate the news list tag to refetch all queries after mutation
      invalidatesTags: [{ type: "Draft", id: "LIST" }],
    }),
  }),
});

export const { useAddDraftMutation } = addDraftAPI;
