import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAppSelector, useSessionStorage } from 'src/hooks';
import { RootState } from 'src/store/store';

export const RequireAuth = () => {
  const token = useSessionStorage('profile').getItem().accessToken;
  const profile = useAppSelector((state: RootState) => state.auth.profile);
  const location = useLocation();

  if (!profile && !token) {
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
