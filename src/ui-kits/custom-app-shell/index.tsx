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
      <div className="flex gap-3 h-[87%]">
        <div className={`${opened ? 'w-80' : 'w-20'} duration-300`}>
          <Sidebar open={opened} setOpened={setOpened} />
        </div>
        <div className="h-full pl-1 pt-3 pr-4 md:pl-7 md:pt-10 md:pr-12 w-full ">
          <section className=" h-full bg-gray-200/90 dark:bg-gray-800/90 rounded-lg flex items-center p-2 sm:p-5 justify-center w-full">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};
