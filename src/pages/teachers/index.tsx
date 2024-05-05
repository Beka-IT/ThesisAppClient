import { Card, Flex, Grid, Popover, Text, Title } from '@mantine/core'
import { IconChecks, IconDots, IconTrash, IconTrendingUp } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useCookie } from 'src/hooks'
import { useChooseTeacherMutation, useGetDepartmentsTeachersQuery, useSetDepartmentAdminRoleMutation, useUserDeleteMutation } from 'src/store'
import { CustomAppShell } from 'src/ui-kits'
import CustomLoader from 'src/ui-kits/custom-loader'
import { notify } from 'src/utils'

export const TeachersPage = () => {
    const profile = useCookie<Profile>("profile").getCookie()
    const { data, isLoading } = useGetDepartmentsTeachersQuery(profile?.departmentId || 0)
    return (
        <CustomAppShell>
            <Grid w="96%">
                {isLoading ?
                    <Grid.Col span={12}>
                        <CustomLoader />
                    </Grid.Col> :
                    data?.map(item => <TeacherCard key={item.id} item={item} />)}
            </Grid>
        </CustomAppShell>
    )
}


type Props = {
    item: Teacher
}

const TeacherCard = ({ item }: Props) => {
    const { t } = useTranslation()
    const [chooseTeacher] = useChooseTeacherMutation()
    const [setToAdminRole] = useSetDepartmentAdminRoleMutation()
    const [deleteStudent] = useUserDeleteMutation()

    const handleChoose = async () => {
        try {
            await chooseTeacher(item.id).unwrap()
            notify(true, t("choosed"))
        } catch (error) {
            notify(false, t("cant-choose"))
        }
    }
    const handleToDepartmentAdmin = async () => {
        try {
            await setToAdminRole(item.id).unwrap()
            notify(true, t("updated"))
        } catch (error) {
            notify(false, t("cant-updated"))
        }
    }


    const handleDelete = async () => {
        try {
            await deleteStudent(item.id).unwrap()
            notify(true, t("deleted"))
        } catch (error) {
            notify(false, t("cant-delete"))
        }
    }
    const actions = [
        {
            label: t("choose"),
            icon: <IconChecks color="green" size={24} />,
            onclick: handleChoose
        },
        {
            label: t("to-department-admin"),
            icon: <IconTrendingUp color="green" size={24} />,
            onclick: handleToDepartmentAdmin
        },
        {
            label: t("delete"),
            icon: <IconTrash color="red" size={24} />,
            onclick: handleDelete
        },
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
                    </Popover>
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
                            {item.firstname} {item.lastname}
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