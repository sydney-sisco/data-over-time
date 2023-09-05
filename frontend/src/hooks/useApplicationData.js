import { useReducer, useEffect, useContext } from "react";
import { AuthContext } from '../AuthProvider';
import reducer, {
  SET_APPLICATION_DATA,
  SET_ENTRIES_DATA,
  SET_CATEGORY,
  ADD_ENTRY,
} from "../reducers/application";

/*
Complex state management lives here.
*/

const initialStateTest = {
  entries: [],
  categories: {
    '1' : {
      name: "Caffeine",
      fields: ["Caffeine Content (mg)", "Source"],
      presets: [
        {
          name: "Office Coffee",
          values: {"Caffeine Content (mg)": 100, "Source": "Coffee"}
        },
        {
          name: "Rockstar",
          values: {"Caffeine Content (mg)": 160, "Source": "Energy Drink"}
        },
      ]  
    },
    '2' : {
      name: "Sleep",
      fields: ["Duration (hrs)", "Quality"],
      presets: [
        {
          name: "Good Sleep",
          values: {"Duration (hrs)": 8, "Quality": "Good"}
        },
        {
          name: "Bad Sleep",
          values: {"Duration (hrs)": 8, "Quality": "Bad"}
        },
      ]
    },
    '3' : {
      name: "Exercise",
    },
  },
};

const initialState = {
  entries: [],
  categories: {},
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initialStateTest);
  const { isLoggedIn, token } = useContext(AuthContext);

  const generateFakeId = async () => {
    // generate a random 5 digit id in place of firestore for now
    return Math.floor(Math.random() * 100000);
  };

  const deleteCategory = async (id) => {
    await dispatch({ type: SET_CATEGORY, id, category: null });
  };

  const saveCategory = async (id, category) => {
    const idToUse = id || await generateFakeId();
    await dispatch({ type: SET_CATEGORY, id:idToUse, category });
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
    if (!isLoggedIn) return;
      const getData = async () => {
        try {
          const res = await fetch('/api/data', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
          });
  
          if (res.status === 200) {
            const responseData = await res.json();
            // setData(responseData.data);
            dispatch({ type: SET_ENTRIES_DATA, entries: responseData.data });
          }
        } catch (error) {
          console.error("Ah, crap! We hit an error, dude: ", error);
        }
      }
  
      getData();

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


  // return { state, setDay, bookInterview, cancelInterview };
  return { state, deleteCategory, saveCategory, submitData }
}