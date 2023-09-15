import axios from "axios";

export async function postRegister(username, password) {
  try {
    const res = await axios.post('/api/register', { username, password });
    return res;
  } catch (error) {
    console.error("Ah, crap! We hit an error, dude: ", error);
    return error;
  }
};

export async function postLogin(username, password) {
  try {
    const res = await axios.post('/api/login', { username, password });
    return res;
  } catch (error) {
    console.error("Ah, crap! We hit an error, dude: ", error);
    return error;
  }
};
