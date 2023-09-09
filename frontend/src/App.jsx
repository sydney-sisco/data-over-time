import { useState, useContext, useMemo, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthContext } from './AuthProvider';
import { ApiTest } from './components/ApiTest'
import futureLogo from '/future.svg'
import Login from './components/Login';
import { Route, Link, useLocation } from "wouter";
import Register from './components/Register';
import DataList from './components/DataList';
import LogData from './components/LogData';
import Category from './components/Category';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import CategoryIcon from '@mui/icons-material/Category';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import TimelineIcon from '@mui/icons-material/Timeline';
import EngineeringIcon from '@mui/icons-material/Engineering';

import {
  getCategoriesForList,
} from './helpers/selectors';
import useApplicationData from "./hooks/useApplicationData.js";
import UserPage from './components/UserPage';

function App() {
  const { isLoggedIn, token, logout, user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [location, setLocation] = useLocation();

  const [value, setValue] = useState(0);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const {
    state,
    saveCategory,
    deleteCategory,
    submitData,
  } = useApplicationData();

  const categories = getCategoriesForList(state).map(
    category => {
      return (
        <Category
          key={category.id}
          id={category.id}
          category={category}
          saveCategory={saveCategory}
          deleteCategory={deleteCategory}
        />
      );
    }
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Container
      // maxWidth="sm"
      align="center"
      sx={{
        mt: 8,
        mb: 24,
      }}
    >
      <div>
      </div>
      <Box >
        <Link href="/">
          {/* <img src={futureLogo} className="logo" alt="future logo" /> */}
          <CircleIcon sx={{ fontSize: 140 }} />
        </Link>
        <Typography sx={{ my: 4 }} component="h1" variant="h2" gutterBottom>
          Data over Time
        </Typography>
      </Box>

      <Route path="/login"><Login /></Route>
      <Route path="/register"><Register /></Route>
      <Route path="/categories">
        {categories}
        <Category
          key="placeholder"
          id={null}
          category={null}
          saveCategory={saveCategory}
          deleteCategory={deleteCategory}
        />
      </Route>
      <Route path="/archive">
        <DataList entries={state.entries} />
      </Route>
      <Route path="/you">
        <UserPage 
          user={user}
          onLogout={logout}
        />
      </Route>
      <Route path="/">
        
        {isLoggedIn ?
          <>
            <LogData categories={getCategoriesForList(state)} setData={setData} submitData={submitData} />
          </>
          :
          <>
            <div className="nav">
              <Link href="/login">
                <Button sx={{mx: 2}} variant="contained">Login</Button>
              </Link>

              <Link href="/register" >
                <Button sx={{mx: 2}} variant="contained">Register</Button>
              </Link>
            </div>
            <p>You must be logged in to continue.</p>
          </>
        }
      </Route>

      {/* <ApiTest endpoint="/api/test" /> */}
      {/* <ApiTest endpoint="/api/test_not_found" /> */}
      {/* <ApiTest endpoint="/api/test_protected" /> */}
      {/* { isLoggedIn
        ? <p>You are logged in! 🎉 token: <b>{token.substring(0, 20)}</b></p>
        : <p>You are not logged in.</p>
      } */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setLocation(newValue);
          }}
        >
          <BottomNavigationAction value="/categories" label="Categories" icon={<CategoryIcon />} />
          <BottomNavigationAction value="/" label="Submit" icon={<HistoryEduIcon />} />
          <BottomNavigationAction value="/" label="" icon={<CircleIcon fontSize='large'/>}/>
          <BottomNavigationAction value="/archive" label="Data" icon={<TimelineIcon />} />
          <BottomNavigationAction value="/you" label="You" icon={<EngineeringIcon />} />
        </BottomNavigation>
      </Paper>
    </Container>
    </ThemeProvider>
  )
}

export default App
