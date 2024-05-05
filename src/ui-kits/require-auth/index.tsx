import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useCookie } from 'src/hooks';

export const RequireAuth = () => {
  const location = useLocation();
  const profile = useCookie("profile").getCookie()
  if (!profile) {
    return (
      <Navigate
        to="/"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
};
