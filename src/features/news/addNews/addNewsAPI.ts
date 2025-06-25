import { apiSlice } from "@/features/Api/apiSlice";
import {
  IAddNewsForm,
  IGetAllNewsParams,
  INews,
} from "@/types/client/news.types";
import { allNewsAPI } from "../allNews/allNewsAPI";

export const addNewsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNews: builder.mutation<INews, IAddNewsForm>({
      query: (newsData) => ({
        url: "/api/news/addNews",
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
          allNewsAPI.util.updateQueryData(
            "getAllNews",
            queryArgs,
            (draft: INews[]) => {
              // Add new item at the start of the list (like unshift)
              draft.unshift({
                ...newsData,
                _id: tempId,
                slug: "Temporary SLug",
                createdAt: new Date().toISOString(),
              });
            }
          )
        );

        try {
          const { data: newNews } = await queryFulfilled;

          // Replace temp item with real item from server response
          dispatch(
            allNewsAPI.util.updateQueryData(
              "getAllNews",
              queryArgs,
              (draft: INews[]) => {
                const index = draft.findIndex(
                  (item: INews) => item._id === tempId
                );
                if (index !== -1) draft[index] = newNews;
              }
            )
          );
        } catch {
          // Undo optimistic update on error
          patchResult.undo();
        }
      },
      // Invalidate the news list tag to refetch all queries after mutation
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),
  }),
});

export const { useAddNewsMutation } = addNewsAPI;
