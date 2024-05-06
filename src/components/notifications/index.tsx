import { Flex, Grid, Image, Paper, Text, Title } from "@mantine/core"
import { Box, Popover } from "@mantine/core"
import { useCookie } from "src/hooks"
import { getTitleByLanguage } from "src/locales"
import { useGetAllNotificationsQuery } from "src/store"
import CustomLoader from "src/ui-kits/custom-loader"
import { DateTime } from "src/utils"

export const Notifications = () => {
    const profile = useCookie<Profile>("profile").getCookie()
    const notificationsCount = profile?.unreadNotificationsCount
    const { data, isLoading } = useGetAllNotificationsQuery({})
    return (
        <Popover>
            <Popover.Target>
                <Box style={{ cursor: "pointer" }} pos="relative">
                    <Image w={25} src="/notification.svg" />
                    {notificationsCount &&
                        <div className="px-1 bg-teal-500 rounded-full text-center text-white text-sm absolute -top-3 -end-2">
                            {notificationsCount}
                            <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                        </div>}
                </Box>
            </Popover.Target>
            <Popover.Dropdown>
                <Box p={10} h="80vh" w={250}>
                    <Grid>
                        {isLoading ?
                            <Grid.Col span={12}>
                                <CustomLoader />
                            </Grid.Col> :
                            data?.map(el => <NotificationItem key={el.id} data={el} />)
                        }
                    </Grid>
                </Box>
            </Popover.Dropdown>
        </Popover>
    )
}

type Props = {
    data: NotificationType
}

const NotificationItem = ({ data }: Props) => {
    const date = DateTime.Format(data.createdAt)
    return (
        <Grid.Col span={12}>
            <Paper w="100%" p={10} shadow="xl">
                <Title fz={{ base: 18, md: 24 }}>
                    {getTitleByLanguage(data)}
                </Title>
                <Flex justify="end">
                    <Text>{date}</Text>
                </Flex>
            </Paper>
        </Grid.Col>
    )
}