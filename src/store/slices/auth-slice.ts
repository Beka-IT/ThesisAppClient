import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<Profile, AuthRequest>({
            query: (body) => ({
                url: Path.User.signIn,
                method: "POST",
                body,
            }),
        }),
        register: builder.mutation({
            query: (body: RegistrationType) => ({
                url: Path.User.signUp,
                method: "POST",
                body
            }),
        }),
        resetPassword: builder.mutation<unknown, ResetPasswordRequest>({
            query: ({ repeatPassword, ...body }) => {
                return {
                    url: Path.User.resetPassword,
                    method: "POST",
                    body,
                }
            },
        }),
        confirmation: builder.mutation<boolean, ConfirmationRequest>({
            query: (body) => {
                return {
                    url: Path.User.confirmation,
                    method: "POST",
                    body,
                }
            },
        }),
        userDelete: builder.mutation<unknown, string | number>({
            query: (id) => {
                return {
                    url: Path.User.delete(id),
                    method: "DELETE",
                }
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useResetPasswordMutation,
    useConfirmationMutation,
    useUserDeleteMutation
} = authApiSlice;