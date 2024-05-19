import { Box, Card, Drawer, Flex, Grid, Modal, Popover, Text, Title, UnstyledButton } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconBellFilled } from "@tabler/icons-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useCookie } from "src/hooks"
import { getTitleByLanguage } from "src/locales"
import {
    useGetAllNotificationsQuery,
    useToReadNotificationMutation
} from "src/store/slices/notification-api"
import { NotificationType } from "src/types"
import CustomLoader from "src/ui-kits/custom-loader"
import { DateTime, notify } from "src/utils"

export const Notifications = () => {
    const [opened, { toggle }] = useDisclosure()
    const { t } = useTranslation()
    const { data, isLoading } = useGetAllNotificationsQuery({
        refetchOnFocus: true,
        refetchOnMount: true
    })
    const profile = useCookie<Profile>("profile").getCookie()
    const count = profile?.unreadNotificationsCount
    useEffect(() => {
        if (count) {
            notify(true, `${t("notifications-count")}: ${count}`)
        }
    }, [count])
    return (
        <>
            <UnstyledButton mx={10} onClick={toggle}>
                <IconBellFilled style={{ color: "green" }} />
            </UnstyledButton>
            <Drawer position="right" onClose={toggle} opened={opened}>
                <Grid gutter={10}>
                    {isLoading ?
                        <Grid.Col span={12}>
                            <CustomLoader />
                        </Grid.Col> :
                        data?.map(el => <NotificationItem key={el.id} data={el} />)}
                </Grid>
            </Drawer>
        </>
    )
}

const NotificationItem = ({ data }: { data: NotificationType }) => {
    const date = DateTime.Format(data.createdAt)
    const [opened, { toggle }] = useDisclosure()
    const [toReadNotification, { data: notificaionDetail, isLoading }] = useToReadNotificationMutation()
    const { t } = useTranslation()
    const title = getTitleByLanguage(data)
    const slicedTitle = title.length > 60 ? `${title.slice(0, 60)}...` : title


    const handleReadMore = () => {
        toggle()
        toReadNotification(data.id)
    }

    const handleRead = async () => {
        try {
            await toReadNotification(data.id).unwrap()
            notify(true, t("saved"))
        } catch (error) {
            notify(false, t("some-error"))
        }
    }

    return (
        <Grid.Col>
            {isLoading ?
                <Box>
                    <CustomLoader />
                </Box>
                : <Card shadow="xs">
                    <Text c={data?.isRead ? "gray" : "black"}>{date}</Text>
                    <Title c={data?.isRead ? "gray" : "black"} lh={1.3} fz={18}>
                        {slicedTitle}
                    </Title>
                    <Flex gap={20} mt={20} justify="end">
                        <UnstyledButton onClick={handleReadMore} c="blue">
                            {t("more")}
                        </UnstyledButton>
                        {!data.isRead &&
                            <UnstyledButton onClick={handleRead} c="blue">
                                {t("have-been-read")}
                            </UnstyledButton>}
                    </Flex>
                </Card>}
            <Modal opened={opened} onClose={toggle}>
                {isLoading ?
                    <Box>
                        <CustomLoader />
                    </Box>
                    :
                    <Box>
                        <Text mb={20}>{date}</Text>
                        <Title lh={1.3} fz={18}>
                            {getTitleByLanguage(notificaionDetail)}
                        </Title>
                    </Box>}
            </Modal>
        </Grid.Col >
    )
}