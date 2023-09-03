import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import styles from './ApiTest.module.css';

export function ApiTest({ endpoint }) {
  const [apiResponse, setApiResponse] = useState('')
  const [apiError, setApiError] = useState('')
  const { token } = useContext(AuthContext);

  useEffect(() => {
    testApi()
  }, []);

  const testApi = async () => {
    const response = await fetch(endpoint,{
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })

    if (!response.ok) {
      setApiError(`Error ${response.status}: ${response.statusText}`)
      setApiResponse('')
      return
    }

    const data = await response.json()
    console.log(data)
    setApiResponse(JSON.stringify(data))
    setApiError('')
  }

  return (
    <div>
      <button onClick={testApi}>test connection to backend: {`${endpoint}`}</button>
      <p>{apiResponse}</p>
      <p className={styles.error}>{apiError}</p>
    </div>
  );
};
