import DayNightToggle from 'react-day-and-night-toggle';
import { useTheme } from 'src/utils/theme-provider';

export const ModeChange = () => {
  const { state, dispatch } = useTheme();
  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };
  return (
    <DayNightToggle
      size={30}
      animationInactive={false}
      onChange={toggleTheme}
      checked={state.theme === "dark"}
    />
  );
};
