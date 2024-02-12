import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'src/hooks';
import { getTitleByLanguage } from 'src/locales';
import { CustomAppShell } from 'src/ui-kits';
import { AppTable } from 'src/ui-kits/app-table';

export const UsersPage = () => {
    const { t } = useTranslation()
    const largeScreen = useMediaQuery("(min-width: 1400px)")
    const smallScreen = useMediaQuery("(min-width: 650px)")
    const extraSmallScreen = useMediaQuery("(min-width: 530px)")
    const navigate = useNavigate()
    const headcell: () => HeadCell<UserResponse>[] = () => {
        if (largeScreen) {
            return [
                {
                    label: t("fullname"),
                    render: (n) => getTitleByLanguage(n.fullname)
                },
                {
                    label: t("faculty"),
                    render: (n) => getTitleByLanguage(n.fullname)
                },
                {
                    label: t("departament"),
                    render: (n) => n.departamentId
                },
                {
                    label: t("email"),
                    render: (n) => n.email
                },
                {
                    label: t("phoneNumber"),
                    render: (n) => n.phoneNumber
                },
            ]
        } else if (smallScreen) {
            return [
                {
                    label: t("fullname"),
                    render: (n) => getTitleByLanguage(n.fullname)
                },
                {
                    label: t("faculty"),
                    render: (n) => getTitleByLanguage(n.fullname)
                },
                {
                    label: t("email"),
                    render: (n) => n.email
                },
            ]
        } else if (extraSmallScreen) {
            return [
                {
                    label: t("fullname"),
                    render: (n) => getTitleByLanguage(n.fullname)
                },
                {
                    label: t("email"),
                    render: (n) => n.email
                },
            ]
        } else {
            return [
                {
                    label: t("fullname"),
                    render: (n) => getTitleByLanguage(n.fullname)
                },
            ]
        }

    }

    const doubleClickOnRow = (row: UserResponse) => {
        navigate(`/users/${row.id}`)
    }

    return (
        <CustomAppShell>
            <AppTable
                doubleClickPath={doubleClickOnRow}
                headCells={headcell()}
            />
        </CustomAppShell>
    )
};
