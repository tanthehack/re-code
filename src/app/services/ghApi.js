import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, selectCurrentToken, selectInstallationId, setCredentials } from "../features/ghSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
        const token = selectCurrentToken()
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    //Here i check for the current results from my baseQuery...
    let result = await baseQuery(args, api, extraOptions)
    // Now depending on what status code the backend returns for an expired accessToken i am going to request for a refresh token 
    // if i have a user currently logged in

    if (result?.error?.status === 401 || result?.error?.status === 403) {
        //I now send refresh token to get new access Token
        const id = selectInstallationId()
        const refreshResult = await baseQuery(`/getAccessToken?id=${id}`, api, extraOptions)
        // console.log(refreshResult, result, "refreshes")

        //Now if it's a success, i get a data object and not an error, and i'll now replace my accessToken and keep my user object  
        if (refreshResult?.data) {
            //store new token 
            api.dispatch(setCredentials({
                installationId: id,
                token: refreshResult?.data?.token
            }))
            //retry original query with new access Token
            result = await baseQuery(args, api, extraOptions)
            // console.log(result, "final")
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const ghApi = createApi({
    reducerPath: "gh",
    baseQuery: baseQueryWithReauth,
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
            query: () => ({
                url: `getUserRepos`,
                method: "GET",
            })
        }),

        sendRepo: builder.mutation({
            query: ({ repo, owner }) => ({
                url: `importCode`,
                method: 'POST',
                body: {
                    repo: repo,
                    owner: owner
                }
            })
        })
    }),
});

export const {
    useGetAccessTokenQuery,
    useLazyGetAccessTokenQuery,
    useLazyGetInstallationsQuery,
    useGetInstallationsQuery,
    useLazyGetUserReposQuery,
    useGetUserReposQuery,
    useSendRepoMutation,
} = ghApi;