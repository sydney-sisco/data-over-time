export function getCategoriesForList(state) {
  // convert state.categories from object to array and embed id
  const categories = [];
  for (const id in state.categories) {
    categories.push({ ...state.categories[id], id });
  }
  return categories;
};
