import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";

export const thesisApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllThesis: builder.query<Thesis[], unknown>({
            query: () => ({
                url: Path.Thesis.getAll,
                method: "GET",
                credentials: "include"
            }),
        }),
        getThesis: builder.query<ThesisDetail, number | string>({
            query: (id) => ({
                url: Path.Thesis.get(id),
                method: "GET",
            }),
        }),
        createThesis: builder.mutation<Thesis, ThesisCreateRequest>({
            query: (body) => ({
                url: Path.Thesis.create,
                method: "POST",
                body
            }),
        }),
        updateThesis: builder.mutation<Thesis, ThesisUpdateRequest>({
            query: (body) => ({
                url: Path.Thesis.update,
                method: "PUT",
                body
            }),
        }),
        getReport: builder.query<ReportRes, unknown>({
            query: () => ({
                url: Path.Thesis.getReport,
                method: "GET",
            }),
        }),
        chooseThesis: builder.mutation<Thesis, string | number>({
            query: (id) => ({
                url: Path.Thesis.choose(id),
                method: "PUT",
            }),
        }),
        toggleisChosenStatus: builder.mutation<Thesis, string | number>({
            query: (id) => ({
                url: Path.Thesis.toggleIsChosenStatus(id),
                method: "PUT",
            }),
        }),
        deleteThesis: builder.mutation<Thesis, string | number>({
            query: (id) => ({
                url: Path.Thesis.delete(id),
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAllThesisQuery,
    useGetThesisQuery,
    useChooseThesisMutation,
    useCreateThesisMutation,
    useDeleteThesisMutation,
    useToggleisChosenStatusMutation,
    useUpdateThesisMutation,
    useGetReportQuery
} = thesisApi