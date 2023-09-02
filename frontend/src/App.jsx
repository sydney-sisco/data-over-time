import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { ApiTest } from './components/ApiTest'
import futureLogo from '/future.svg'
import './App.css'
import Record from './components/Record'

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div>
        <a href="https://github.com/sydney-sisco/webapp-template" target="_blank">
          <img src={futureLogo} className="logo" alt="future logo" />
        </a>
      </div>
      <h1>Data over Time</h1>
      <Record />
      <ApiTest endpoint="/api/test" />
      {/* <ApiTest endpoint="/api/test_not_found" /> */}
      <ApiTest endpoint="/api/test_protected" />
      { isLoggedIn
        ? <p>You are logged in! 🎉</p>
        : <p>You are not logged in.</p>
      }
    </>
  )
}

export default App
