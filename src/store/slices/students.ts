import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";

export const studentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query<Student[], unknown>({
            query: () => ({
                url: Path.Students.getAllStudets,
                method: "GET",
            }),
        }),
        getMyStudents: builder.query<Student[], unknown>({
            query: () => ({
                url: Path.Students.getMyStudents,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllStudentsQuery,
    useGetMyStudentsQuery
} = studentsApi