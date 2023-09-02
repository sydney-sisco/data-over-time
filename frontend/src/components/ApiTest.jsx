import { useState, useEffect } from 'react';

export function ApiTest({ endpoint }) {
  const [apiResponse, setApiResponse] = useState('')
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    testApi()
  }, []);

  const testApi = async () => {
    const response = await fetch(endpoint)

    if (!response.ok) {
      setApiError(`Error ${response.status}: ${response.statusText}`)
      return
    }

    const data = await response.json()
    console.log(data)
    setApiResponse(JSON.stringify(data))
  }

  return (
    <div>
      <button onClick={testApi}>test connection to backend: {`${endpoint}`}</button>
      <p>{apiResponse}</p>
      <p className="error">{apiError}</p>
    </div>
  );
};
