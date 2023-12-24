import { Outlet, useLocation } from 'react-router-dom';
import { Header } from 'src/components';

export const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div>
      {(pathname === '/sign-in' || pathname === '/sign-up') && <Header />}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
