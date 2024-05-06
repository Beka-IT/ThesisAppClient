import { Button, Flex, Text } from "@mantine/core"
import { Grid, Title } from "@mantine/core"
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { getTitleByLanguage } from "src/locales"
import { useGetRequestQuery } from "src/store"
import { CustomAppShell } from "src/ui-kits"
import CustomLoader from "src/ui-kits/custom-loader"

type Params = {
    id: string
}

export const ThesisRequestDetail = () => {
    const { id } = useParams<Params>()
    const { t } = useTranslation()
    const { data, isLoading } = useGetRequestQuery(id || 1, {
        refetchOnMountOrArgChange: !!id
    })

    return (
        <CustomAppShell>
            <Flex w="100%" mb={30} style={{ borderBottom: "1px solid rgba(39,39,39, 0.3)" }} py={10}>
                <Button bg="baseDark" component={Link} to={`/thesis/${id}/edit`}>
                    {t("edit")}
                </Button>
            </Flex>
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
                                {t("isMyTheme")}
                            </Text>
                            {data?.isMyTheme ?
                                <IconCircleCheck color='green' size={35} />
                                : <IconXboxX color='red' size={35} />}
                        </Grid.Col>
                    </>
                )}
            </Grid>
        </CustomAppShell>
    )
}
