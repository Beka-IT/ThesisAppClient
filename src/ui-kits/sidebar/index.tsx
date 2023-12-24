import { useAppSelector } from 'src/hooks';
import { Links } from '../links';

interface SideBarProps {
    open: boolean;
    setOpened: (a: boolean) => void
}

export const Sidebar = ({ open, setOpened }: SideBarProps) => {
    const { menu } = useAppSelector((s) => s.auth);

    const links = menu?.map((item) => (
        <Links onClick={setOpened} key={item.path} path={item.path} icon={item.icon} title={item.title} open={open} />
    ));

    return (
        <div
            className={`w-full justify-start items-start px-4 sm:px-6 h-screen bg-gray-200 dark:bg-gray-800 flex shadow-2xl shadow-slate-400 dark:shadow-slate-600`}
        >
            <nav className="flex flex-col gap-6 py-10">{links}</nav>
        </div>
    );
};
