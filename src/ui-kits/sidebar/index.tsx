import { useTranslation } from 'react-i18next';
import { Links } from '../links';
import { useCookie } from 'src/hooks';
import { getMenu } from 'src/constants';

interface SideBarProps {
    open: boolean;
    setOpened: (a: boolean) => void
}



export const Sidebar = ({ open, setOpened }: SideBarProps) => {
    const { t } = useTranslation()
    const profile = useCookie<Profile>("profile").getCookie()
    const role = profile?.role
    const links = getMenu(t)?.map((item) => item?.roles?.includes(role) &&
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
            className={`w-full  justify-start items-start h-screen bg-gray-200 dark:bg-gray-800 flex shadow-2xl shadow-slate-400 dark:shadow-slate-600`}
        >
            <nav className="flex flex-col pt-5 w-full">{links}</nav>
        </div>
    );
};
