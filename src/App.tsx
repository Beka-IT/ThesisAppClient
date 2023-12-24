import { Route, Routes } from 'react-router-dom';
import { RouteConfig, RouteData } from './route-config';
import { Layout, RequireAuth } from './ui-kits';
import { useAppSelector } from './hooks';

const renderRoutes = (route: RouteData) => {
  const arr = [];
  if (route.child) {
    route.child.forEach((it) => {
      arr.push(<Route path={it.path} key={it.path} element={it.page} />);
    });
  } else {
    arr.push(<Route path={route.path} key={route.path} element={route.page} />);
    route.children?.forEach((it) => {
      arr.push(<Route path={it.path} key={it.path} element={it.page} />);
    });
  }
  return arr;
};

export const App = () => {
  const { theme } = useAppSelector((s) => s.auth);

  return (
    <div className={`${theme}`}>
      <Routes>
        {RouteConfig().map((it) => {
          if (it.public) {
            return (
              <Route path={it.path} key={it.path} element={<Layout />}>
                {renderRoutes(it)}
              </Route>
            );
          } else {
            return (
              <Route element={<RequireAuth />} key={it.path}>
                {renderRoutes(it)}
              </Route>
            );
          }
        })}
      </Routes>
    </div>
  );
};
export default App;
