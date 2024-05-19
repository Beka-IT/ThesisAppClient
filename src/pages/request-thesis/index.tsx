import { Box, Text, Title } from "@mantine/core"
import { Button, Card, Flex, Grid, Popover } from "@mantine/core"
import { IconChecks, IconDots, IconEye, IconHandStop, IconPencil, IconTrash } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { useCookie } from "src/hooks"
import { getTitleByLanguage } from "src/locales"
import {
    useApplyRequestMutation,
    useDeclineRequestMutation,
    useDeleteRequestMutation,
    useGetAllRequestsQuery
} from "src/store"
import { RolesEnum } from "src/types"
import { CustomAppShell } from "src/ui-kits"
import CustomLoader from "src/ui-kits/custom-loader"
import { notify } from "src/utils"

export const RequestThesisPage = () => {
    const { data, isLoading } = useGetAllRequestsQuery({})
    const { t } = useTranslation()
    const profile = useCookie<Profile>("profile").getCookie()
    const role = profile?.role
    return (
        <CustomAppShell>
            <Box w="100%">
                {role === RolesEnum.STUDENT &&
                    <Flex w="100%" mb={30} style={{ borderBottom: "1px solid rgba(39,39,39, 0.3)" }} py={10}>
                        <Button bg="baseDark" component={Link} to="/request-thesis/create">
                            {t("create")}
                        </Button>
                    </Flex>}
                <Grid w="96%">
                    {isLoading ?
                        <Grid.Col span={12}>
                            <CustomLoader />
                        </Grid.Col> :
                        data?.map(item => <RequestCard key={item.id} item={item} />)}
                </Grid>
            </Box>
        </CustomAppShell>
    )
}



const RequestCard = ({ item }: { item: RequestRespone }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const profile = useCookie<Profile>("profile").getCookie()
    const role = profile?.role
    const [declineRequest] = useDeclineRequestMutation()
    const [applyRequest] = useApplyRequestMutation()
    const [deleteRequest] = useDeleteRequestMutation()
    const handleDelete = async () => {
        try {
            await deleteRequest(item.id).unwrap()
            notify(true, t("deleted"))
            navigate(0)
        } catch (error) {
            notify(false, t("cant-delete"))
        }
    }

    const handleApply = async () => {
        try {
            await applyRequest(item.id).unwrap()
            notify(true, t("toggled-to-chosen"))
        } catch (error) {
            notify(false, t("cant-to-chosen"))
        }
    }

    const handleDecline = async () => {
        try {
            await declineRequest(item.id).unwrap()
            notify(true, t("choosed"))
        } catch (error) {
            notify(false, t("cant-choose"))
        }
    }
    const editAction = {
        label: t("edit"),
        icon: <IconPencil color="orange" size={24} />,
        onclick: () => navigate(`/request-thesis/${item.id}/edit`)
    }
    const viewAction = {
        label: t("detail"),
        icon: <IconEye color="green" size={24} />,
        onclick: () => navigate(`/request-thesis/${item.id}`)
    }
    const deleteAction = {
        label: t("delete"),
        icon: <IconTrash color="red" size={24} />,
        onclick: handleDelete
    }
    const toApplyAction = {
        label: t("apply"),
        icon: <IconChecks color="green" size={24} />,
        onclick: handleApply
    }
    const toDeclineAction = {
        label: t("decline"),
        icon: <IconHandStop color="purple" size={24} />,
        onclick: handleDecline
    }
    const actions = () => {
        switch (role) {
            case RolesEnum.ADMIN:
                return []
            case RolesEnum.DEPARTMENT_ADMIN:
                return [viewAction]
            case RolesEnum.TEACHER:
                return [viewAction, toApplyAction, toDeclineAction]
            case RolesEnum.STUDENT:
                return [viewAction, editAction, deleteAction]
            default:
                return []
        }


    }

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
                                {actions()?.map(el => (
                                    <Flex gap={5} style={{ cursor: "pointer" }} py={5} onClick={el.onclick}>
                                        {el.icon}
                                        <Text fz={16}>{el.label}</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
                <Flex component={Link} direction="column" gap={4} to={`/thesis/${item.id}`}>
                    <div>
                        <Text>
                            {t("topic")}:
                        </Text>
                        <Title style={{ wordWrap: "break-word" }} textWrap="wrap" lh={1.2} fz={{ base: 20, md: 24 }}>
                            {getTitleByLanguage(item)}
                        </Title>
                    </div>
                    <div>
                        <Text>
                            {t("creater-fullname")}:
                        </Text>
                        <Title fw="bold" lh={1.2} fz={{ base: 16, md: 18 }}>
                            {item.studentLastname} {item.studentFirstname} {item.studentPatronomyc}
                        </Title>
                    </div>
                </Flex>
            </Card>
        </Grid.Col>
    )
}