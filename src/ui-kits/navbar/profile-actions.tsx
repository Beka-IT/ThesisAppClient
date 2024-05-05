import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IconUserCircle } from '@tabler/icons-react';
import { ChangePassword } from 'src/components';
import { Modal, Popover, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCookie } from 'src/hooks';

export const ProfileActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure()
  const cookie = useCookie("profile")
  const handleOpen = () => {
    toggle();
  };

  const handleLogout = async () => {
    navigate('/');
    cookie.removeCookie()
  };

  const actions = [
    {
      title: t("profile"),
      onClick: () => navigate(`/profile`),
    },
    {
      title: t("changePassword"),
      onClick: () => handleOpen(),
    },
    {
      title: t("logout"),
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div className="relative">
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <IconUserCircle color="grey"
              style={{ cursor: "pointer" }} size={34} />
          </Popover.Target>
          <Popover.Dropdown>
            <>
              {actions?.map(el => (
                <UnstyledButton key={el.title} py={6} onClick={el.onClick}>
                  {el.title}
                </UnstyledButton>
              ))}
            </>
          </Popover.Dropdown>
        </Popover>
      </div>
      <Modal
        centered withCloseButton={false}
        opened={opened} onClose={toggle}>
        <ChangePassword toggle={toggle} />
      </Modal>
    </>
  );
};
