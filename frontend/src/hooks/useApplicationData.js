import { useReducer, useEffect, useContext } from "react";
import { AuthContext } from '../AuthProvider';
import reducer, {
  SET_APPLICATION_DATA,
  SET_ENTRIES_DATA,
  SET_CATEGORY,
  SET_CATEGORIES,
  ADD_ENTRY,
} from "../reducers/application";

/*
Complex state management lives here.
*/
const initialState = {
  entries: [],
  categories: {},
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoggedIn, token, logout } = useContext(AuthContext);

  const deleteCategory = async (id) => {

    console.log('deleting category: ', id);
    
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      if (res.status === 200) {
        console.log('Category deleted successfully');

        await dispatch({ type: SET_CATEGORY, id, category: null });
      }
    } catch (error) {
      console.error("Ah, crap! We hit an error, dude: ", error);
    }
  };

  const saveCategory = async (id, category) => {
    // const idToUse = id || await generateFakeId();
    if(!id) {
      try {
        console.log('saving category: ', category, 'with id: ', id);
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(category),
        });

        if (res.status === 200) {
          const responseData = await res.json();
          console.log('response from saveCategory: ', responseData.data);

          await dispatch({ type: SET_CATEGORY, id: responseData.data.id, category: responseData.data });
        }
      }
      catch (error) {
        console.error("Ah, crap! We hit an error, dude: ", error);
      }
    } else {
      try {
        console.log('updating category: ', category, 'with id: ', id);
        const res = await fetch(`/api/categories/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(category),
        });

        if (res.status === 200) {
          const responseData = await res.json();
          console.log(responseData);

          await dispatch({ type: SET_CATEGORY, id, category });
        }
      }
      catch (error) {
        console.error("Ah, crap! We hit an error, dude: ", error);
      }
    }
  };

  const submitData = async (data) => {
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

        // setData((prevData) => [responseData.data, ...prevData]);
        dispatch({ type: ADD_ENTRY, entry: responseData.data });

      }
    } catch (error) {
      console.error("Ah, crap! We hit an error, dude: ", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // TODO: clear entries as well.
      dispatch({ type: SET_APPLICATION_DATA, categories: null });
      return;
    }
  
    const getData = async () => {
      try {
        const res = await fetch('/api/data', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });

        // check for 401 or 403
        if (res.status === 401 || res.status === 403) {
          console.log('Unauthorized, logging out');
          logout();
          return;
        }

        if (res.status === 200) {
          const responseData = await res.json();
          // setData(responseData.data);
          dispatch({ type: SET_ENTRIES_DATA, entries: responseData.data });
        }
      } catch (error) {
        console.error("Ah, crap! We hit an error, dude: ", error);
      }
    }

    const getCategories = async () => {
      try {
        const res = await fetch('/api/categories', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });

        if (res.status === 200) {
          const responseData = await res.json();
          console.log("setting categories: ", responseData.data);
          dispatch({ type: SET_CATEGORIES, categories: responseData.data });
        }
      } catch (error) {
        console.error("Ah, crap! We hit an error, dude: ", error);
      }
    }

    getData();
    getCategories();

  }, [isLoggedIn]);

  // const setDay = (day) => dispatch({ type: SET_DAY, day });

  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview },
  //   };

  //   return axios
  //     .put(`/api/appointments/${id}`, appointment)
  //     .then((response) => {
  //       dispatch({ type: SET_INTERVIEW, id, interview });
  //     });
  // }

  // function cancelInterview(id) {
  //   return axios.delete(`/api/appointments/${id}`).then((response) => {
  //     dispatch({ type: SET_INTERVIEW, id, interview: null });
  //   });
  // }

  // useEffect(() => {
  //   var exampleSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

  //   exampleSocket.onmessage = function (event) {
  //     const data = JSON.parse(event.data);

  //     if (data.type === "SET_INTERVIEW") {
  //       dispatch({
  //         type: SET_INTERVIEW,
  //         id: data.id,
  //         interview: data.interview,
  //       });
  //     }
  //   };

  //   Promise.all([
  //     axios.get("/api/days"),
  //     axios.get("/api/appointments"),
  //     axios.get("/api/interviewers"),
  //   ]).then((all) => {
  //     const [daysRes, appointmentsRes, interviewersRes] = all;

  //     dispatch({
  //       type: SET_APPLICATION_DATA,
  //       days: daysRes.data,
  //       appointments: appointmentsRes.data,
  //       interviewers: interviewersRes.data,
  //     });
  //   });
  // }, []);

  return { state, deleteCategory, saveCategory, submitData }
}