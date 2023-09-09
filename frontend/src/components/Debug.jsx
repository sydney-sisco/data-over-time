import { ApiTest } from './ApiTest'


function Debug({ isLoggedIn, token }) {
  return (
    <>
      <ApiTest endpoint="/api/test" />
      {/* <ApiTest endpoint="/api/test_not_found" /> */}
      <ApiTest endpoint="/api/test_protected" />
      {isLoggedIn
        ? <p>You are logged in! 🎉 token: <b>{token.substring(0, 20)}</b></p>
        : <p>You are not logged in.</p>
      }
    </>
  )
}

export default Debug;
