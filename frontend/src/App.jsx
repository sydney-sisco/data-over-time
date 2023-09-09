import { useState, useContext, useMemo, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthContext } from './AuthProvider';
import { ApiTest } from './components/ApiTest'
import futureLogo from '/future.svg'
import Login from './components/Login';
import { Route, Link, useLocation } from "wouter";
import Logout from './components/Logout';
import Register from './components/Register';
import DataList from './components/DataList';
import LogData from './components/LogData';
import Category from './components/Category';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';

import {
  getCategoriesForList,
} from './helpers/selectors';
import useApplicationData from "./hooks/useApplicationData.js";

function App() {
  const { isLoggedIn, token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // when isLoggedIn changes, redirect to root if user is not logged in
    if (!isLoggedIn) {
      setLocation('/');
    }
  }, [isLoggedIn]);

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
        <Logout />
        <Link href="/">
          <Button variant="contained">Back</Button>
        </Link>
        {categories}
        <Category
          key="placeholder"
          id={null}
          category={null}
          saveCategory={saveCategory}
          deleteCategory={deleteCategory}
        />
      </Route>
      <Route path="/">
        
        {isLoggedIn ?
          <>
            <Logout />
            <LogData categories={getCategoriesForList(state)} setData={setData} submitData={submitData} />
            <DataList entries={state.entries} />
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
    </Container>
    </ThemeProvider>
  )
}

export default App
