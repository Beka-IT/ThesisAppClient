import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";

export const deadlineApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createDeadline: builder.mutation<Deadline, Deadline>({
            query: (body) => ({
                url: Path.Deadlines.create,
                method: "POST",
                body
            }),
        }),
        getDeadline: builder.query<Deadline, unknown>({
            query: () => ({
                url: Path.Deadlines.get,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateDeadlineMutation,
    useGetDeadlineQuery
} = deadlineApi;