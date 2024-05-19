import { Route, Routes } from 'react-router-dom';
import { routes } from './route-config';
import { Layout } from './ui-kits';
import { useTheme } from './utils/theme-provider';
import { useCookie } from './hooks';

export const App = () => {
  const { state } = useTheme();
  const profile = useCookie<Profile>("profile").getCookie()
  const role = profile?.role

  return (
    <div className={`${state.theme}`}>
      <Routes>
        {routes.map((it) => {
          if (it.roles.includes(role)) {
            return (
              <Route path={it.path} key={it.path} element={<Layout />}>
                <Route path={it.path} element={it.page} />
              </Route>
            );
          }
        })}
      </Routes>
    </div>
  );
};
export default App;
