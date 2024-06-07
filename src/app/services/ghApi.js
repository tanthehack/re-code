import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ghApi = createApi({
    reducerPath: "gh",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    endpoints: (builder) => ({
        getAccessToken: builder.query({
            query: ({ id }) => ({
                url: `/getAccessToken?id=${id}`,
                method: "GET",
            }),
        }),

        getInstallations: builder.query({
            query: () => ({
                url: "getInstallations",
                method: "GET",
            })
        }),

        getUserRepos: builder.query({
            query: ({ token }) => ({
                url: `getUserRepos?token=${token}`,
                method: "GET",
            })
        }),
    }),
});

export const {
    useGetAccessTokenQuery,
    useLazyGetAccessTokenQuery,
    useLazyGetInstallationsQuery,
    useLazyGetUserReposQuery,
} = ghApi;