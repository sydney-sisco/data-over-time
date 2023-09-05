import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { ApiTest } from './components/ApiTest'
import futureLogo from '/future.svg'
import './App.css'
import Login from './components/Login';
import { Route, Link, Redirect } from "wouter";
import Logout from './components/Logout';
import Register from './components/Register';
import DataList from './components/DataList';
import LogData from './components/LogData';
import Category from './components/Category';

import {
  getCategoriesForList,
} from './helpers/selectors';
import useApplicationData from "./hooks/useApplicationData.js";

function App() {
  const { isLoggedIn, token } = useContext(AuthContext);
  const [data, setData] = useState([]);

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
    <>
      <div>
        <Link href="/">
          <img src={futureLogo} className="logo" alt="future logo" />
        </Link>
      </div>
      <h1>Data over Time</h1>

      { isLoggedIn
        ? <Logout />
        : <div className="nav">
            <Link href="/login"><button>Login</button></Link>
            <Link href="/register"><button>Register</button></Link>
          </div>
      }

      <Route path="/login"><Login/></Route>
      <Route path="/register"><Register/></Route>
      <Route path="/categories">
        <Link href="/"><button>Back</button></Link>
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
        { isLoggedIn ?
          <>
          <LogData categories={getCategoriesForList(state)} setData={setData} submitData={submitData}/>
          <DataList entries={state.entries} />
          </>
          :
          <p>You must be logged in to continue.</p>
        }
      </Route>

      {/* <ApiTest endpoint="/api/test" /> */}
      {/* <ApiTest endpoint="/api/test_not_found" /> */}
      {/* <ApiTest endpoint="/api/test_protected" /> */}
      {/* { isLoggedIn
        ? <p>You are logged in! 🎉 token: <b>{token.substring(0, 20)}</b></p>
        : <p>You are not logged in.</p>
      } */}
    </>
  )
}

export default App
