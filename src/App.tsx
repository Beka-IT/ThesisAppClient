import { Route, Routes } from 'react-router-dom';
import { routes } from './route-config';
import { Layout } from './ui-kits';
import { useTheme } from './utils/theme-provider';

export const App = () => {
  const role = undefined
  const { state, dispatch } = useTheme();
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
