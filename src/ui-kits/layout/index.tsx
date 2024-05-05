import { Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname !== '/sign-i' && pathname !== '/sign-up'
  return (
    <>
      <Outlet />
    </>
  );
};
