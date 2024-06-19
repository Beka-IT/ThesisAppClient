import { CustomAppShell } from 'src/ui-kits'
import { Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { RequestForm } from '../form'

export const CreateRequest = () => {
    const { t } = useTranslation()
    return (
        <CustomAppShell>
            <Title className="dark:text-white mb-4">
                {t("create")}
            </Title>
            <RequestForm />
        </CustomAppShell>
    )
}
