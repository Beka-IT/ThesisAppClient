import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";

export const requestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRequest: builder.mutation<unknown, RequestRequest>({
            query: (body) => ({
                url: Path.Requests.create,
                method: "POST",
                body
            }),
        }),
        applyRequest: builder.mutation<unknown, string | number>({
            query: (id) => ({
                url: Path.Requests.apply(id),
                method: "PUT",
            }),
        }),
        declineRequest: builder.mutation<unknown, string | number>({
            query: (id) => ({
                url: Path.Requests.decline(id),
                method: "PUT",
            }),
        }),
        updateRequest: builder.mutation<unknown, RequestRequest>({
            query: (body) => ({
                url: Path.Requests.update,
                method: "PUT",
                body
            }),
        }),
        deleteRequest: builder.mutation<unknown, number | string>({
            query: (id) => ({
                url: Path.Requests.delete(id),
                method: "DELETE",
            }),
        }),
        getRequest: builder.query<RequestRespone, string | number>({
            query: (id) => ({
                url: Path.Requests.get(id),
                method: "GET",
            }),
        }),
        getAllThesisRequests: builder.query<RequestRespone[], unknown>({
            query: () => {
                return {
                    url: Path.Requests.getAll,
                    method: "GET",
                }
            },
        }),
    }),
});

export const {
    useApplyRequestMutation,
    useCreateRequestMutation,
    useDeclineRequestMutation,
    useGetRequestQuery,
    useDeleteRequestMutation,
    useGetAllThesisRequestsQuery,
    useUpdateRequestMutation,
} = requestApi