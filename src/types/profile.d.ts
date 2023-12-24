import { ReactNode } from 'react';

declare type ProfileType = {
  menu: Menu[];
  authenticationToken: string;
  refreshToken: string;
};

declare type Menu = {
  title: string;
  icon: ReactNode;
  path: string;
};
