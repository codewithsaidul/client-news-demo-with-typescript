import { apiSlice } from "@/features/Api/apiSlice";

export const draftToRePostAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    draftToRePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/news/draftToRePublished/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        // নতুনভাবে যুক্ত হওয়া live news list এর জন্য
        { type: "News", id: "LIST" },
        // draft/trash থেকে রিমুভ করার জন্য
        { type: "Draft", id },
        { type: "Draft", id: "LIST" },
      ],
    }),
  }),
});



export const { useDraftToRePostMutation } = draftToRePostAPI