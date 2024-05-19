import { Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname !== '/sign-in' && pathname !== '/sign-up'
  return (
    <>
      <Outlet />
    </>
  );
};
