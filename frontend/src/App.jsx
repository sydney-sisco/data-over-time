import { useState, useEffect } from 'react'
import { ApiTest } from './components/ApiTest'
import { ConnectionState } from './components/ConnectionState'
import futureLogo from '/future.svg'
import './App.css'
import Record from './components/Record'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://github.com/sydney-sisco/webapp-template" target="_blank">
          <img src={futureLogo} className="logo" alt="future logo" />
        </a>
      </div>
      <h1>webapp-template</h1>
      <p className="read-the-docs">
        Click on the logo to learn more
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Record />
      <ApiTest />
    </>
  )
}

export default App
