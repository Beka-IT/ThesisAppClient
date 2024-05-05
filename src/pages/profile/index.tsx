import { Button, Flex, Grid, Modal, Text, Title } from '@mantine/core';
import { Box } from '@mantine/core';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookie } from 'src/hooks';
import { CustomAppShell } from 'src/ui-kits';
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react"
import { useDisclosure } from '@mantine/hooks';
import { VerifyCode } from 'src/components';

export const ProfilePage = () => {
    const [opened, { toggle }] = useDisclosure()
    const { t } = useTranslation()
    const profile = useCookie<Profile>("profile").getCookie();
    const data = [
        {
            label: t("firstname"),
            value: profile?.firstname
        },
        {
            label: t("lastname"),
            value: profile?.lastname
        },
        {
            label: t("patronomyc"),
            value: profile?.patronomyc
        },
        {
            label: t("phoneNumber"),
            value: profile?.phoneNumber
        },
        {
            label: t("email"),
            value: profile?.email
        },
        {
            label: t("role"),
            value: profile?.role
        },
        {
            label: t("facultyId"),
            value: profile?.facultyId
        },
        {
            label: t("departmentId"),
            value: profile?.departmentId
        },
        {
            label: t("chosenThesisId"),
            value: profile?.chosenThesisId || t("not-chosen")
        },
    ]
    return (
        <CustomAppShell>
            <Grid gutter={{ base: 10, md: 20 }}>
                {data?.map(item => <ProfileDataItem key={item.value} data={item} />)}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Flex mb={10} align="center" gap={10} style={{ borderBottom: "1px solid rgba(39,39,39, 0.3)" }}>
                        <Title fz={{ base: 16, md: 20 }}>
                            {t("isVerified")}
                        </Title>
                        {profile?.isVerified ?
                            <IconCircleCheck color='green' size={35} />
                            : <IconXboxX color='red' size={35} />}
                    </Flex>
                    {!profile?.isVerified &&
                        <Button onClick={toggle} bg="orange">
                            {t("verify")}
                        </Button>}

                </Grid.Col>
            </Grid>
            <Modal
                withCloseButton={false}
                closeOnClickOutside={false}
                centered opened={opened} onClose={toggle}>
                <VerifyCode toggle={toggle} />
            </Modal>
        </CustomAppShell>
    );
};

type ItemProps = {
    data: {
        label: string;
        value: ReactNode
    }
}

const ProfileDataItem = ({ data }: ItemProps) => {
    return (
        <Grid.Col span={{ base: 12, md: 6 }}>
            <Box>
                <Title c="grey"
                    style={{ borderBottom: "1px solid rgba(39,39,39, 0.3)" }}
                    fz={{ base: 16, md: 20 }}>{data.label}</Title>
                <Box mt={10} fz={{ base: 20, md: 24 }}>{data.value}</Box>
            </Box>
        </Grid.Col>
    )
}
