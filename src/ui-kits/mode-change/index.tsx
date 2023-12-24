import { UseActions, useAppSelector } from 'src/hooks';
import DayNightToggle from 'react-day-and-night-toggle';

export const ModeChange = () => {
  const { theme } = useAppSelector((s) => s.auth);
  const { setTheme } = UseActions();

  return (
    <DayNightToggle
      animationInactive={false}
      onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      checked={theme === 'dark'}
      shadows={false}
    />
  );
};
