import { AdminPage, SignIn, SignUp, UsersPage } from './pages';
import { ProfilePage } from './pages/profile';

export interface RouteData {
  path: string;
  page: JSX.Element;
  public: boolean;
  child?: ReadonlyArray<RouteData>;
  children?: ReadonlyArray<RouteData>;
  isChild?: boolean;
}

export const RouteConfig = (): RouteData[] => {
  return [
    {
      path: '/',
      page: <AdminPage />,
      public: true,
    },
    {
      path: '/sign-in',
      page: <SignIn />,
      public: true,
    },
    {
      path: '/sign-up',
      page: <SignUp />,
      public: true,
    },
    {
      path: '/profile',
      page: <ProfilePage />,
      public: true,
    },
    {
      path: '/users',
      page: <UsersPage />,
      public: true,
    },
  ];
};
