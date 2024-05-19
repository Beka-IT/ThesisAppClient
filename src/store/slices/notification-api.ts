import { Path } from "src/utils/path";
import { apiSlice } from "src/store/apiSlice";
import { NotificationType } from "src/types";

export const notificationApi = apiSlice.injectEndpoints({
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
        toReadNotification: builder.mutation<NotificationType, number | string>({
            query: (id) => ({
                url: Path.Notifications.get(id),
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllNotificationsQuery,
    useGetNotificationQuery,
    useToReadNotificationMutation
} = notificationApi;