import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

const Record = () => {
  const { token } = useContext(AuthContext);

  const postData = async () => {
    const data = null;

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: data ? JSON.stringify(data) : null,
      });
    } catch (error) {
      console.error("Ah, crap! We hit an error, dude: ", error);
    }
  }


  return (
    <button onClick={postData}>
      Click Me, If You Dare! 😉
    </button>
  );
}

export default Record;
