import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks';
import { logOut } from 'src/store/reducers/auth-slice';
import { useSessionStorage } from 'src/hooks';
import { IconUserCircle } from '@tabler/icons-react';
import { ChangePassword } from 'src/components';

export const ProfileActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { removeItem: removeProfile } = useSessionStorage('profile');

  const [open, setOpen] = useState<boolean>(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setChangePasswordOpen(true);
    setOpen(false);
  };

  const handleLogout = async () => {
    removeProfile();
    navigate('/sign-in');
    dispatch({ type: logOut.type });
  };

  const actions = [
    {
      title: t`profile`,
      onClick: () => navigate(`/profile`),
    },
    {
      title: t`changePassword`,
      onClick: () => handleOpen(),
    },
    {
      title: t`logout`,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div className="relative">
        <div onClick={() => setOpen((prev) => !prev)}>
          <IconUserCircle
            size={30}
            className="text-gray-900 cursor-pointer dark:text-white"
          />
        </div>
        {open && (
          <nav className="absolute bg-gray-900 text-white px-4 py-5 right-0 top-10 flex flex-col gap-3 items-start font-medium">
            {actions.map((el) => (
              <button key={el.title} onClick={el.onClick}>
                {el.title}
              </button>
            ))}
          </nav>
        )}
      </div>
      {changePasswordOpen && (
        <ChangePassword setHidden={setChangePasswordOpen} />
      )}
      {}
    </>
  );
};
