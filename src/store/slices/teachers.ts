import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";

export const teachersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        chooseTeacher: builder.mutation<unknown, number | string>({
            query: (id) => ({
                url: Path.Teachers.chooseTeacher(id),
                method: "GET",
            }),
        }),
        getDepartmentsTeachers: builder.query<Teacher[], string | number>({
            query: (id) => ({
                url: Path.Teachers.getDepartmentsTeachers(id),
                method: "GET",
            }),
        }),
        getMyTeachers: builder.query<Teacher[], unknown>({
            query: () => {
                return {
                    url: Path.Teachers.getMyTeachers,
                    method: "GET",
                }
            },
        }),
        setDepartmentAdminRole: builder.mutation<unknown, string | number>({
            query: (id) => {
                return {
                    url: Path.Teachers.setDepartmentAdminRole(id),
                    method: "GET",
                }
            },
        }),
    }),
});

export const {
    useGetDepartmentsTeachersQuery,
    useChooseTeacherMutation,
    useGetMyTeachersQuery,
    useSetDepartmentAdminRoleMutation
} = teachersApi