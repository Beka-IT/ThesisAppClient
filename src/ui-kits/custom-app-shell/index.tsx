import { ReactNode, useState } from 'react';
import { Sidebar } from '../sidebar';
import { Navbar } from '../navbar';
import { ScrollArea } from '@mantine/core';

interface AppShellProps {
  children?: ReactNode;
}

export const CustomAppShell = ({ children }: AppShellProps) => {
  const [opened, setOpened] = useState<boolean>(true);

  const toggleMenu = () => {
    setOpened(prev => !prev)
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-700">
      <div>
        <Navbar setOpen={toggleMenu} />
      </div>
      <div className="flex gap-3 h-[87%]">
        <div className={`${opened ? 'w-80' : 'w-20'} duration-300`}>
          <Sidebar open={opened} setOpened={setOpened} />
        </div>
        <div className="h-full -pl-2 pt-2 pr-2 md:pl-1 md:pt-4 md:pr-4 w-full ">
          <section className=" h-full bg-gray-200/90 dark:bg-gray-800/90 rounded-lg flex items-start p-2 sm:p-3 justify-start w-full">
            <ScrollArea w="100%" h="100%">
              {children}
            </ScrollArea>
          </section>
        </div>
      </div>
    </div>
  );
};
