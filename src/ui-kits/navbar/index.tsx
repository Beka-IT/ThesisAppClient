import { ModeChange } from '../mode-change';
import { ProfileActions } from './profile-actions';
import { DeadlineTime, LanguageSelect } from 'src/components';
import { BurgerMenu } from './burger-menu';
import { Notifications } from '@mantine/notifications';

interface NavbarProps {
  setOpen: () => void;
}

export const Navbar = ({ setOpen }: NavbarProps) => {
  return (
    <header className="w-screen h-20 bg-gray-50 dark:bg-gray-900 px-8 sm:px-16 flex items-center justify-center shadow-2xl shadow-slate-300 dark:shadow-slate-600">
      <div className="flex flex-wrap w-full justify-between">
        <div className="flex items-center gap-5">
          <BurgerMenu onClick={setOpen} />
        </div>
        <DeadlineTime />
        <div className="flex items-center">
          <Notifications />
          <ModeChange />
          <LanguageSelect />
          <ProfileActions />
        </div>
      </div>
    </header>
  );
};
