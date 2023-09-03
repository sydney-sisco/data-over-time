import { useState, useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import axios from "axios";

const Record = ({ setData }) => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState([]);

  const postData = async () => {
    const data = {
      name,
    };

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

        setData((prevData) => [responseData.data, ...prevData]);

      }
    } catch (error) {
      console.error("Ah, crap! We hit an error, dude: ", error);
    }
  }


  return (
    <>
      <h2>Record Data</h2>
      <label>
        Name:
        <input type="text" onChange={e => setName(e.target.value)} />
      </label>

      <button onClick={postData}>
        Click Me, If You Dare! 😉
      </button>
    </>
  );
}

export default Record;
