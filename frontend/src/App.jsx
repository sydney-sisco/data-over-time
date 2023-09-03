import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { ApiTest } from './components/ApiTest'
import futureLogo from '/future.svg'
import './App.css'
import Record from './components/Record'
import Login from './components/Login';
import { Route, Link, Redirect } from "wouter";
import Logout from './components/Logout';
import Register from './components/Register';
import DataList from './components/DataList';

function App() {
  const { isLoggedIn, token } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {

    if (!isLoggedIn) {
      setData([]);
      return;
    }


    const getData = async () => {
      try {
        const res = await fetch('/api/data', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });

        if (res.status === 200) {
          const responseData = await res.json();
          setData(responseData.data);
        }
      } catch (error) {
        console.error("Ah, crap! We hit an error, dude: ", error);
      }
    }

    getData();
  }, [token]);
            

  return (
    <>
      <div>
        <Link href="/">
          <img src={futureLogo} className="logo" alt="future logo" />
        </Link>
      </div>
      <h1>Data over Time</h1>

      { isLoggedIn
        ? <Logout />
        : <div>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
      }

      <Route path="/login"><Login/></Route>
      <Route path="/register"><Register/></Route>
      <Route path="/">
        {/* { !isLoggedIn && <Redirect to='/login' /> } */}
        <Record setData={setData} />
        <DataList entries={data} />
      </Route>

      {/* <Record /> */}
      <ApiTest endpoint="/api/test" />
      {/* <ApiTest endpoint="/api/test_not_found" /> */}
      <ApiTest endpoint="/api/test_protected" />
      { isLoggedIn
        ? <p>You are logged in! 🎉 token: <b>{token.substring(0, 20)}</b></p>
        : <p>You are not logged in.</p>
      }
    </>
  )
}

export default App
