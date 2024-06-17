import { useTranslation } from 'react-i18next';
import { Links } from '../links';
import { IconFolderQuestion, IconHourglassHigh, IconNotes, IconUsers, IconWallpaper } from '@tabler/icons-react';

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
            title: t("thesis")
        },
        {
            icon: <IconUsers />,
            path: "/teachers",
            title: t("teachers")
        },
        {
            icon: <IconUsers />,
            path: "/students",
            title: t("students")
        },
        {
            icon: <IconHourglassHigh />,
            path: "/deadline",
            title: t("deadline")
        },
        {
            icon: <IconFolderQuestion />,
            path: "/request-thesis",
            title: t("request-thesis")
        },
        {
            icon: <IconWallpaper />,
            path: "/report",
            title: t("report")
        },
    ]
}

export const Sidebar = ({ open, setOpened }: SideBarProps) => {
    const { t } = useTranslation()
    const links = getMenu(t)?.map((item) => (
        <Links onClick={setOpened} key={item.path} path={item.path} icon={item.icon} title={item.title} open={open} />
    ));

    return (
        <div
            className={`w-full  justify-start items-start h-screen bg-gray-200 dark:bg-gray-800 flex shadow-2xl shadow-slate-400 dark:shadow-slate-600`}
        >
            <nav className="flex flex-col pt-5">{links}</nav>
        </div>
    );
};
