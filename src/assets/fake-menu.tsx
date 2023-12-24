import { Icon3dCubeSphere, IconSettings, IconUsers } from '@tabler/icons-react';
import { Menu } from 'src/types/profile';

export const defaultMenu: Menu[] = [
  {
    icon: <Icon3dCubeSphere size={30} />,
    path: '/system',
    title: 'system',
  },
  {
    icon: <IconSettings size={30} />,
    path: '/users',
    title: 'users',
  },
  {
    icon: <IconUsers size={30} />,
    path: '/settings',
    title: 'settings',
  },
];
