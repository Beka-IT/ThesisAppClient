import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query<NotificationType[], unknown>({
            query: () => ({
                url: Path.Notifications.getAll,
                method: "GET",
            }),
        }),
        getNotification: builder.query<NotificationType, number | string>({
            query: (id) => ({
                url: Path.Notifications.get(id),
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllNotificationsQuery,
    useGetNotificationQuery
} = notificationsApi;