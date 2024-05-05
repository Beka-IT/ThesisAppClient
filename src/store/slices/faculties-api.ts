import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";

export const facultiesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFaculties: builder.query<Faculties[], unknown>({
            query: () => ({
                url: Path.Faculties.getFaculties,
                method: "GET",
            }),
        }),
        getDepartaments: builder.query<Departments[], number | string>({
            query: (id) => ({
                url: Path.Faculties.getDepartaments(id),
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetDepartamentsQuery,
    useGetFacultiesQuery
} = facultiesApi;