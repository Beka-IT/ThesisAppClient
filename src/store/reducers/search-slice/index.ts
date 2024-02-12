import { apiSlice } from "src/store/apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchRequest: builder.query({
            query: ({ path, body }) => ({
                url: path,
                method: "POST",
                body,
                cache: "no-cache",
            }),
            providesTags: [],
        }),
    }),
});

export const { useLazySearchRequestQuery, useSearchRequestQuery } =
    searchApiSlice;
