import { Button, Flex, List, Text } from "@mantine/core"
import { Grid, Title } from "@mantine/core"
import { IconCircleCheck, IconMail, IconXboxX } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { useCookie } from "src/hooks"
import { getTitleByLanguage } from "src/locales"
import { useChooseThesisMutation, useGetThesisQuery } from "src/store"
import { RolesEnum } from "src/types"
import { CustomAppShell } from "src/ui-kits"
import CustomLoader from "src/ui-kits/custom-loader"
import { DateTime, notify } from "src/utils"

type Params = {
    id: string
}

export const ThesisDetail = () => {
    const { id } = useParams<Params>()
    const { t } = useTranslation()
    const { data, isLoading } = useGetThesisQuery(id || 1, {
        refetchOnMountOrArgChange: !!id
    })
    const profile = useCookie<Profile>("profile").getCookie()
    const role = profile?.role
    const createdAt = DateTime.Format(`${data?.createdAt}`)
    const updatedAt = DateTime.Format(`${data?.updatedAt}`)
    const [choose] = useChooseThesisMutation();

    const handleChoose = async () => {
        if (id) {
            try {
                await choose(id).unwrap()
                notify(true, t("choosed"))
            } catch (error) {
                notify(false, t("cant-choose"))
            }
        }
    }
    return (
        <CustomAppShell>
            {role === RolesEnum.TEACHER &&
                <Flex w="100%" mb={30} style={{ borderBottom: "1px solid rgba(39,39,39, 0.3)" }} py={10}>
                    <Button bg="baseDark" component={Link} to={`/thesis/${id}/edit`}>
                        {t("edit")}
                    </Button>
                </Flex>}
            <Grid className="dark:text-white">
                {isLoading ? (
                    <Grid.Col>
                        <CustomLoader />
                    </Grid.Col>
                ) : (
                    <>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text fz={{ base: 16, md: 20 }}>
                                {t("topic")}
                            </Text>
                            <Title
                                style={{ wordWrap: "break-word" }}
                                textWrap="wrap" lh={1.2}
                                fz={{ base: 22, md: 24 }}>
                                {getTitleByLanguage(data)}
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text fz={{ base: 16, md: 20 }}>
                                {t("description")}
                            </Text>
                            <Title style={{ wordWrap: "break-word" }}
                                textWrap="wrap" lh={1.2}
                                fz={{ base: 22, md: 24 }}>
                                {getTitleByLanguage({
                                    titleTr: data?.descriptionTr,
                                    titleKg: data?.descriptionKg
                                })}
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text fz={{ base: 16, md: 20 }}>
                                {t("curator")}
                            </Text>
                            <Title style={{ wordWrap: "break-word" }}
                                textWrap="wrap" lh={1.2}
                                fz={{ base: 22, md: 26 }}>
                                {data?.curatorLastname} {data?.curatorFirstname} {data?.curatorPatronomyc}
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text fz={{ base: 16, md: 20 }}>
                                {t("createdAt")}
                            </Text>
                            <Title style={{ wordWrap: "break-word" }}
                                textWrap="wrap" lh={1.2}
                                fz={{ base: 22, md: 26 }}>
                                {createdAt}
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text fz={{ base: 16, md: 20 }}>
                                {t("updatedAt")}
                            </Text>
                            <Title style={{ wordWrap: "break-word" }}
                                textWrap="wrap" lh={1.2}
                                fz={{ base: 22, md: 26 }}>
                                {updatedAt}
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text fz={{ base: 16, md: 20 }}>
                                {t("isChosen")}
                            </Text>
                            {data?.isChosen ?
                                <IconCircleCheck color='green' size={35} />
                                : <IconXboxX color='red' size={35} />}
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Text mb={10} fz={{ base: 16, md: 20 }}>
                                {t("chosenBy")}
                            </Text>
                            <List>
                                {data?.chosenBy?.map(item => (
                                    <List.Item>
                                        <Title fz={{ base: 16, sm: 18 }}>
                                            {item.lastname} {item.firstname} {item.patronomyc}
                                        </Title>
                                        <Text>
                                            <IconMail /> {item.email}
                                        </Text>
                                    </List.Item>
                                ))}
                            </List>
                        </Grid.Col>
                    </>
                )}
            </Grid>
            {role === RolesEnum.STUDENT &&
                <Flex w="100%" mb={30} style={{ borderBottom: "1px solid rgba(39,39,39, 0.3)" }} py={10}>
                    <Button bg="baseDark" onClick={handleChoose}>
                        {t("choose")}
                    </Button>
                </Flex>}
        </CustomAppShell>
    )
}
