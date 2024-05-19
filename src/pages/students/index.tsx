import { Card, Flex, Grid, Popover, Text, Title } from "@mantine/core"
import { IconDots, IconTrash } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { useCookie } from "src/hooks"
import { useGetAllStudentsQuery, useGetMyStudentsQuery, useUserDeleteMutation } from "src/store"
import { RolesEnum } from "src/types"
import { CustomAppShell } from "src/ui-kits"
import CustomLoader from "src/ui-kits/custom-loader"
import { notify } from "src/utils"

export const StudentsPage = () => {
    const { data: allStudents, isLoading: allStudentsLoading } = useGetAllStudentsQuery({})
    const { data: myStudents, isLoading: myStudentsLoading } = useGetMyStudentsQuery({})
    const profile = useCookie<Profile>("profile").getCookie()
    const role = profile?.role
    const loading = myStudentsLoading || allStudentsLoading
    const data = role === RolesEnum.ADMIN ? allStudents : myStudents

    return (
        <CustomAppShell>
            <Grid w="96%">
                {loading ?
                    <Grid.Col span={12}>
                        <CustomLoader />
                    </Grid.Col> :
                    data?.map(item =>
                        <StudentCard key={item.id} item={item} />)}
            </Grid>
        </CustomAppShell>
    )
}

type Props = {
    item: Student
}

const StudentCard = ({ item }: Props) => {
    const { t } = useTranslation()
    const [deleteStudent] = useUserDeleteMutation()
    const profile = useCookie<Profile>("profile").getCookie()
    const role = profile?.role
    const handleDelete = async () => {
        try {
            await deleteStudent(item.id).unwrap()
            notify(true, t("deleted"))
        } catch (error) {
            notify(false, t("cant-delete"))
        }
    }
    const deleteAction = {
        label: t("delete"),
        icon: <IconTrash color="red" size={24} />,
        onclick: handleDelete
    }
    const actions = () => {
        switch (role) {
            case RolesEnum.DEPARTMENT_ADMIN:
                return [deleteAction]
            default:
                return []
        }
    }
    return (
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
            <Card maw="100%" shadow='lg'>
                <Flex w="100%" justify="end">
                    {actions()?.length ?
                        <Popover position="bottom-end">
                            <Popover.Target>
                                <IconDots style={{ cursor: "pointer" }} />
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Flex direction="column" >
                                    {actions()?.map(el => (
                                        <Flex gap={5}
                                            style={{ cursor: "pointer" }}
                                            py={5}
                                            onClick={el.onclick}>
                                            {el.icon}
                                            <Text fz={16}>{el.label}</Text>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Popover.Dropdown>
                        </Popover> : null}
                </Flex>
                <Flex direction="column" gap={4}>
                    <div>
                        <Text>
                            {t("fullname")}
                        </Text>
                        <Title
                            style={{ wordWrap: "break-word" }}
                            textWrap="wrap"
                            lh={1.2}
                            fz={{ base: 18, md: 22 }}>
                            {item.firstname} {item.lastname} {item.patronomyc}
                        </Title>
                    </div>
                    <div>
                        <Text>
                            {t("email")}
                        </Text>
                        <Title
                            style={{ wordWrap: "break-word" }}
                            textWrap="wrap"
                            lh={1.2}
                            fz={20}>
                            {item.email}
                        </Title>
                    </div>
                </Flex>
            </Card>
        </Grid.Col >
    )
}