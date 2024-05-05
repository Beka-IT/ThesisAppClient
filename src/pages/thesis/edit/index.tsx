import { CustomAppShell } from 'src/ui-kits'
import { ThesisForm } from '../form'
import { useParams } from 'react-router-dom'
import { useGetThesisQuery } from 'src/store'
import CustomLoader from 'src/ui-kits/custom-loader'
import { Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

type Params = {
    id: string
}
export const EditThesis = () => {
    const { id } = useParams<Params>()
    const { t } = useTranslation()
    const { data, isLoading } = useGetThesisQuery(id || 1, {
        refetchOnMountOrArgChange: !!id
    })
    return (
        <CustomAppShell>
            <Title className="dark:text-white">
                {t("edit")}
            </Title>
            {isLoading && !data ? <CustomLoader /> :
                <ThesisForm data={data} />}
        </CustomAppShell>
    )
}
