import { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from '../sidebar';
import { Navbar } from '../navbar';
import { useSessionStorage } from 'src/hooks';

interface AppShellProps {
  children?: ReactNode;
}

export const CustomAppShell = ({ children }: AppShellProps) => {
  const [opened, setOpened] = useState<boolean>(true);
  const { getItem, setItem } = useSessionStorage('sidebar');

  const handleClickMenu = () => {
    const currentValue: boolean = getItem()?.value || false;
    setItem({ value: !currentValue });
    setOpened(!currentValue);
  };

  useEffect(() => {
    handleClickMenu();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-700">
      <div>
        <Navbar setOpen={handleClickMenu} />
      </div>
      <div className="flex gap-3">
        <div className={`${opened ? 'w-80' : 'w-20'} duration-300`}>
          <Sidebar open={opened} setOpened={setOpened} />
        </div>
        <div className="pl-1 pt-3 pr-4 md:pl-7 md:pt-10 md:pr-12 w-full">
          <section className="dark:bg-gray-50/20 bg-gray-900/20 rounded-lg flex items-center p-5 justify-center w-full h-full">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};
