import { CustomAppShell } from 'src/ui-kits'
import { ThesisForm } from '../form'
import { Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const CreateThesis = () => {
    const { t } = useTranslation()
    return (
        <CustomAppShell>
            <Title className="dark:text-white mb-4">
                {t("create")}
            </Title>
            <ThesisForm />
        </CustomAppShell>
    )
}
