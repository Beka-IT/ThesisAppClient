import { Text, Title } from "@mantine/core"
import { Box, Button, Card, Flex, Grid, Popover } from "@mantine/core"
import { IconDots, IconEye, IconNotesOff, IconPencil, IconStackPush, IconTrash } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { getTitleByLanguage } from "src/locales"
import {
    useApplyRequestMutation,
    useDeclineRequestMutation,
    useDeleteRequestMutation,
    useGetAllThesisRequestsQuery
} from "src/store"
import { CustomAppShell } from "src/ui-kits"
import CustomLoader from "src/ui-kits/custom-loader"
import { notify } from "src/utils"

export const RequestThesisPage = () => {
    const { data, isLoading } = useGetAllThesisRequestsQuery({})
    const { t } = useTranslation()
    return (
        <CustomAppShell>
            <Box w="100%">
                <Flex w="100%" mb={30} style={{ borderBottom: "1px solid rgba(39,39,39, 0.3)" }} py={10}>
                    <Button bg="baseDark" component={Link} to="/thesis/create">
                        {t("request")}
                    </Button>
                </Flex>
                <Grid w="96%">
                    {isLoading ?
                        <Grid.Col span={12}>
                            <CustomLoader />
                        </Grid.Col> :
                        data?.map(item => <ThesisRequestCard key={item.id} item={item} />)}
                </Grid>
            </Box>
        </CustomAppShell>
    )
}


const ThesisRequestCard = ({ item }: { item: RequestRespone }) => {
    const { t } = useTranslation()
    const [deleteRequest] = useDeleteRequestMutation()
    const [applyRequest] = useApplyRequestMutation()
    const [declineRequest] = useDeclineRequestMutation()
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await deleteRequest(item.id).unwrap()
            notify(true, t("deleted"))
            navigate(0)
        } catch (error) {
            notify(false, t("cant-delete"))
        }
    }

    const handleApplyRequest = async () => {
        try {
            await applyRequest(item.id).unwrap()
            notify(true, t("toggled-to-chosen"))
            navigate(0)
        } catch (error) {
            notify(false, t("cant-to-chosen"))
        }
    }

    const handleDeclineRequest = async () => {
        try {
            await declineRequest(item.id).unwrap()
            notify(true, t("choosed"))
            navigate(0)
        } catch (error) {
            notify(false, t("cant-choose"))
        }
    }

    const actions = [
        {
            label: t("edit"),
            icon: <IconPencil color="orange" size={24} />,
            onclick: () => navigate(`/request-thesis/${item.id}/edit`)
        },
        {
            label: t("detail"),
            icon: <IconEye color="green" size={24} />,
            onclick: () => navigate(`/request-thesis/${item.id}`)
        },
        {
            label: t("delete"),
            icon: <IconTrash color="red" size={24} />,
            onclick: handleDelete
        },
        {
            label: t("apply"),
            icon: <IconStackPush color="purple" size={24} />,
            onclick: handleApplyRequest
        },
        {
            label: t("decline"),
            icon: <IconNotesOff color="orange" size={24} />,
            onclick: handleDeclineRequest
        }
    ]

    return (
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
            <Card maw="100%" shadow='lg'>
                <Flex w="100%" justify="end">
                    <Popover position="bottom-end">
                        <Popover.Target>
                            <IconDots style={{ cursor: "pointer" }} />
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Flex direction="column" >
                                {actions?.map(el => (
                                    <Flex gap={5} style={{ cursor: "pointer" }} py={5}
                                        onClick={el.onclick}>
                                        {el.icon}
                                        <Text fz={16}>{el.label}</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
                <Flex component={Link} direction="column" gap={4} to={`/request-thesis/${item.id}`}>
                    <div>
                        <Text>
                            {t("topic")}
                        </Text>
                        <Title style={{ wordWrap: "break-word" }} textWrap="wrap" lh={1.2} fz={{ base: 20, md: 24 }}>
                            {getTitleByLanguage(item)}
                        </Title>
                    </div>
                </Flex>
            </Card>
        </Grid.Col>
    )
}