import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import axios from "axios";

const Record = ({ setData }) => {
  const { token } = useContext(AuthContext);

  const postData = async () => {
    const data = null;

    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: data ? JSON.stringify(data) : null,
      });

      if (res.status === 200) {
        console.log('Data posted successfully');

        const responseData = await res.json();
        console.log(responseData);

        setData((prevData) => [...prevData, responseData.data]);

      }
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
