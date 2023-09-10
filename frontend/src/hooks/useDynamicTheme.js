import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';

const useUserThemeMode = () => {
  // Gets the user's system preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // Sets up the state for user's preference
  const [userMode, setUserMode] = React.useState(prefersDarkMode ? 'dark' : 'light');

  // Reuse the toggle function from your example
  const toggleColorMode = () => {
    setUserMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // toggle when system preference changes
  React.useEffect(() => {
    setUserMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);


  // Create a theme based on the user's preference
  const theme = React.useMemo(() => createTheme({
      palette: {
        mode: userMode,
      },
  }), [userMode]);

  return { theme, toggleColorMode };
};

export default useUserThemeMode;
