import { ModeChange } from '../mode-change';
import { ProfileActions } from './profile-actions';
import { DeadlineTime, LanguageSelect, Notifications } from 'src/components';
import { BurgerMenu } from './burger-menu';
import { useCookie } from 'src/hooks';
import { RolesEnum } from 'src/types';

interface NavbarProps {
  setOpen: () => void;
}

export const Navbar = ({ setOpen }: NavbarProps) => {
  const profile = useCookie<Profile>("profile").getCookie()
  const role = profile?.role
  return (
    <header className="w-screen h-20 bg-gray-50 dark:bg-gray-900 px-8 sm:px-16 flex items-center justify-center shadow-2xl shadow-slate-300 dark:shadow-slate-600">
      <div className="flex flex-wrap w-full justify-between">
        <div className="flex items-center gap-5">
          <BurgerMenu onClick={setOpen} />
        </div>
        {role !== RolesEnum.ADMIN && <DeadlineTime />}
        <div className="flex items-center">
          <ModeChange />
          <LanguageSelect />
          <ProfileActions />
          <Notifications />
        </div>
      </div>
    </header>
  );
};
