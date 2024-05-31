import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ghApi = createApi({
    reducerPath: "gh",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:4000" }),
    endpoints: (builder) => ({
        getAccessToken: builder.query({
            query: ({ code }) => ({
                url: `/getAccessToken?code=${code}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAccessTokenQuery,
    useLazyGetAccessTokenQuery
} = ghApi;