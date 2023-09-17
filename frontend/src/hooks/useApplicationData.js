import { useReducer, useEffect, useContext } from "react";
import { AuthContext } from '../AuthProvider';
import reducer, {
  SET_APPLICATION_DATA,
  SET_ENTRIES_DATA,
  SET_CATEGORY,
  SET_CATEGORIES,
  ADD_ENTRY,
} from "../reducers/application";
import api from '../apiService';

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
    const deletedCategory = await api.deleteCategory(id);
  
    if(deletedCategory) {
      await dispatch({ type: SET_CATEGORY, id, category: null });
    }
  }

  const saveCategory = async (id, category) => {
    const returnedCategory = await api.saveCategory(id, category);

    if(returnedCategory) {
      await dispatch({ type: SET_CATEGORY, id: returnedCategory.id, category: returnedCategory });
    }
  }

  const submitData = async (data) => {
    const responseData = await api.submitData(data);

    if(responseData) {
      dispatch({ type: ADD_ENTRY, entry: responseData });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // TODO: clear entries as well.
      dispatch({ type: SET_APPLICATION_DATA, categories: null });
      return;
    }
  
    const getData = async () => {
      const entries = await api.getData();

      if(entries) {
        dispatch({ type: SET_ENTRIES_DATA, entries });
      }
    }

    const getCategories = async () => {
      const categories = await api.getCategories();

      if(categories) {
        dispatch({ type: SET_CATEGORIES, categories });
      }
    }

    getData();
    getCategories();

  }, [isLoggedIn]);

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
