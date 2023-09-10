import { useState, useContext, useMemo, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthContext } from './AuthProvider';
import futureLogo from '/future.svg'
import Login from './components/Login';
import { Route, Switch, Link, useLocation } from "wouter";
import Register from './components/Register';
import DataList from './components/DataList';
import LogData from './components/LogData';
import Category from './components/Category';
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
import useDynamicTheme from "./hooks/useDynamicTheme.js";
import UserPage from './components/UserPage';
import Gate from './components/Gate';
import Debug from './components/Debug';

function App() {
  const { isLoggedIn, token, logout, user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const isStandAlone = useMediaQuery('(display-mode: standalone)');
  const [location, setLocation] = useLocation();

  const { theme, toggleColorMode } = useDynamicTheme();

  const [value, setValue] = useState(0);

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

        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>


          {!isLoggedIn ?
            <Route>
              <Gate />
            </Route>
            :
            <>
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
                <LogData categories={getCategoriesForList(state)} setData={setData} submitData={submitData} />
              </Route>
            </>
          }
        </Switch>

        {/* <Debug token={token} isLoggedIn={isLoggedIn} /> */}

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setLocation(newValue);
            }}
            sx={isStandAlone?{mb: {
              xs: 4,
              sm: 0,
            }}:{}}
          >
            <BottomNavigationAction value="/categories" label="Categories" icon={<CategoryIcon />} />
            <BottomNavigationAction value="/" label="Submit" icon={<HistoryEduIcon />} />
            <BottomNavigationAction value="/" label="" icon={<CircleIcon fontSize='large' />} onClick={toggleColorMode}/>
            <BottomNavigationAction value="/archive" label="Data" icon={<TimelineIcon />} />
            <BottomNavigationAction value="/you" label="You" icon={<EngineeringIcon />} />
          </BottomNavigation>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default App
