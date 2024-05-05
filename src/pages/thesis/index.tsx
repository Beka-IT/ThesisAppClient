import { Popover, Text } from '@mantine/core'
import { Box, Button, Card, Flex, Grid, Title } from '@mantine/core'
import { IconChecks, IconDots, IconEye, IconHandStop, IconPencil, IconTrash } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { getTitleByLanguage } from 'src/locales'
import { useChooseThesisMutation, useDeleteThesisMutation, useGetAllThesisQuery, useToggleisChosenStatusMutation } from 'src/store'
import { CustomAppShell } from 'src/ui-kits'
import CustomLoader from 'src/ui-kits/custom-loader'
import { DateTime, notify } from 'src/utils'

export const ThesisPage = () => {
    const { data, isLoading } = useGetAllThesisQuery({})
    const { t } = useTranslation()
    return (
        <CustomAppShell>
            <Box w="100%">
                <Flex w="100%" mb={30} style={{ borderBottom: "1px solid rgba(39,39,39, 0.3)" }} py={10}>
                    <Button bg="baseDark" component={Link} to="/thesis/create">
                        {t("create")}
                    </Button>
                </Flex>
                <Grid w="96%">
                    {isLoading ?
                        <Grid.Col span={12}>
                            <CustomLoader />
                        </Grid.Col> :
                        data?.map(item => <ThesisCard key={item.id} item={item} />)}
                </Grid>
            </Box>
        </CustomAppShell>
    )
}


const ThesisCard = ({ item }: { item: Thesis }) => {
    const { t } = useTranslation()
    const date = DateTime.Format(item.createdAt)
    const [choose] = useChooseThesisMutation();
    const [toggleIsChosen] = useToggleisChosenStatusMutation()
    const [deleteThesis] = useDeleteThesisMutation()
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await deleteThesis(item.id).unwrap()
            notify(true, t("deleted"))
            navigate(0)
        } catch (error) {
            notify(false, t("cant-delete"))
        }
    }

    const handleIsChosen = async () => {
        try {
            await toggleIsChosen(item.id).unwrap()
            notify(true, t("toggled-to-chosen"))
            navigate(0)
        } catch (error) {
            notify(false, t("cant-to-chosen"))
        }
    }

    const handleChoose = async () => {
        try {
            await choose(item.id).unwrap()
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
            onclick: () => navigate(`/thesis/${item.id}/edit`)
        },
        {
            label: t("detail"),
            icon: <IconEye color="green" size={24} />,
            onclick: () => navigate(`/thesis/${item.id}`)
        },
        {
            label: t("delete"),
            icon: <IconTrash color="red" size={24} />,
            onclick: handleDelete
        },
        {
            label: t("isChosen"),
            icon: <IconHandStop color="purple" size={24} />,
            onclick: handleIsChosen
        },
        {
            label: t("choose"),
            icon: <IconChecks color="green" size={24} />,
            onclick: handleChoose
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
                            {t("topic")}
                        </Text>
                        <Title style={{ wordWrap: "break-word" }} textWrap="wrap" lh={1.2} fz={{ base: 20, md: 24 }}>
                            {getTitleByLanguage(item)}
                        </Title>
                    </div>
                    <div>
                        <Text>
                            {t("creater")}
                        </Text>
                        <Title fw="bold" lh={1.2} fz={{ base: 16, md: 18 }}>
                            {item.curatorLastname} {item.curatorFirstname} {item.curatorPatronomyc}
                        </Title>
                    </div>
                    <div>
                        <Text>
                            {t("createdAt")}
                        </Text>
                        <Title fw="bold" lh={1.2} fz={{ base: 16, md: 18 }}>
                            {date}
                        </Title>
                    </div>
                </Flex>
            </Card>
        </Grid.Col>
    )
}
