import { useTranslation } from 'react-i18next';
import { Links } from '../links';
import {
    IconFolderQuestion,
    IconUserPentagon,
    IconHourglassHigh,
    IconNotes,
    IconUsers
} from '@tabler/icons-react';
import { useCookie } from 'src/hooks';
import { RolesEnum } from 'src/types';

interface SideBarProps {
    open: boolean;
    setOpened: (a: boolean) => void
}

type getMenuType = (t: (s: string) => string) => Menu[]

const getMenu: getMenuType = (t) => {
    return [
        {
            icon: <IconNotes />,
            path: "/thesis",
            title: t("thesis"),
            roles: [
                RolesEnum.DEPARTMENT_ADMIN,
                RolesEnum.TEACHER,
                RolesEnum.STUDENT
            ]
        },
        {
            icon: <IconUserPentagon />,
            path: "/teachers",
            title: t("teachers"),
            roles: [
                RolesEnum.ADMIN,
                RolesEnum.DEPARTMENT_ADMIN,
                RolesEnum.STUDENT
            ]
        },
        {
            icon: <IconUsers />,
            path: "/students",
            title: t("students"),
            roles: [
                RolesEnum.ADMIN,
                RolesEnum.DEPARTMENT_ADMIN,
                RolesEnum.TEACHER
            ]
        },
        {
            icon: <IconHourglassHigh />,
            path: "/deadline",
            title: t("deadline"),
            roles: [RolesEnum.DEPARTMENT_ADMIN]
        },
        {
            icon: <IconFolderQuestion />,
            path: "/request-thesis",
            title: t("request-thesis"),
            roles: [
                RolesEnum.TEACHER,
                RolesEnum.STUDENT
            ]
        },
    ]
}

export const Sidebar = ({ open, setOpened }: SideBarProps) => {
    const { t } = useTranslation()
    const profile = useCookie<Profile>("profile").getCookie()
    const role = profile?.role
    const links = getMenu(t)?.map((item) => item.roles.includes(role) &&
        (
            <Links
                onClick={setOpened}
                key={item.path}
                path={item.path}
                icon={item.icon}
                title={item.title}
                open={open} />
        ));

    return (
        <div
            className={`w-full justify-start items-start h-screen bg-gray-200 dark:bg-gray-800 flex shadow-2xl shadow-slate-400 dark:shadow-slate-600`}
        >
            <nav className="flex flex-col pt-5 w-full">{links}</nav>
        </div>
    );
};
