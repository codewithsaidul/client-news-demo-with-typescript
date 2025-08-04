import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["News", "Users", "Trash News", "Draft"],
    endpoints: () => ({})
})



