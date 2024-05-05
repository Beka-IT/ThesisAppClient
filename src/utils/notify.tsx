import { showNotification } from "@mantine/notifications";
import { IconCircleCheckFilled, IconXboxX } from '@tabler/icons-react'

type notifyType = (isSuccess?: boolean, title?: string, message?: string) => Promise<void>

export const notify: notifyType = async (isSuccess, title, message) => {
    showNotification({
        title: title,
        message: message,
        color: isSuccess ? "green" : "white",
        icon: isSuccess ?
            <IconCircleCheckFilled size={25} strokeWidth={5} color="white" /> :
            <IconXboxX size={25} strokeWidth={3} color="red" />,
        styles: () => ({
            root: {
                maxWidth: 400,
                minWidth: 280,
                margin: "10px 20px",
                position: "absolute",
                bottom: 20,
                right: 20
            },
            title: {
                color: isSuccess ? "green" : "red",
                fontWeight: "bold",
                fontSize: 16
            },
            description: {
                color: "gray",
                fontSize: 14,
                whiteSpace: "pre-line"
            }
        }),
    });
};