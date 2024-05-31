import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ghApi = createApi({
    reducerPath: "gh",
    baseQuery: fetchBaseQuery({ baseUrl: "https://the-re-code.netlify.app" }),
    endpoints: (builder) => ({
        getAccessToken: builder.mutation({
            query: (code) => ({
                // url: `/login/oauth/access_token?client_id=${import.meta.env.VITE_GH_CLIENT_ID}&client_secret=${import.meta.env.VITE_GH_CLIENT_SECRET}&code=${code}`,
                // method: "POST",
                url: `/oauth`,
                method: "POST",
                body: { code },
            }),
        }),
    }),
});

export const {
    useGetAccessTokenMutation,
} = ghApi;