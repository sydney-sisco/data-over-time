export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_ENTRIES_DATA = "SET_ENTRIES_DATA";
export const ADD_ENTRY = "ADD_ENTRY";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_APPLICATION_DATA:
      return { ...state, categories: action.categories };

    case SET_CATEGORY:
      if (action.category === null) {
        const categories = { ...state.categories };
        delete categories[action.id];
        return { ...state, categories };
      } else {
        console.log("action.id", action.id, 'saving: ', action.category);

        return {
          ...state,
          categories: {
            ...state.categories,
            [action.id]: action.category,
          },
        };
      }

    case SET_ENTRIES_DATA:
      return { ...state, entries: action.entries };

    case ADD_ENTRY:
      return { ...state, entries: [action.entry, ...state.entries] };
      
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
