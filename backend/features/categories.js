const firestore = require('../utils/firestore')

const defaultCategories = [
  {
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
  {
    name: "Nicotine",
    fields: ["Nicotine Content (mg)", "Source"],
    presets: [
      {
        name: "Vape",
        values: {"Nicotine Content (mg)": 50, "Source": "Vape"}
      },
      {
        name: "Cigarette",
        values: {"Nicotine Content (mg)": 20, "Source": "Cigarette"}
      },
      {
        name: "Gum",
        values: {"Nicotine Content (mg)": 4, "Source": "Gum"}
      },
    ]
  },
  {
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
  {
    name: "Exercise",
  },
];

const saveDefaultCategories = async (userId) => {
  defaultCategories.forEach(category => {
    // saveCategory is a function that adds a category to a user's account
    saveCategory(category, userId);
  });
};

const getCategoriesForUser = async (userId) => {
  try {
    const categoriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('data.categories');
    const snapshot = await categoriesRef.get();
    const categories = {};
    snapshot.forEach((doc) => {
      categories[doc.id] = {
        ...doc.data(),
        id: doc.id,
      };
    });
    return categories;
  } catch (error) {
    console.error('Error retrieving categories:', error);
  }
};

const saveCategory = async (categoryObj, userId) => {

  const name = categoryObj.name || null;
  const fields = categoryObj.fields || [];
  const presets = categoryObj.presets || [];

  try {
    const categoryCollectionRef = firestore
      .collection('users')
      .doc(userId)
      .collection('data.categories');
    const docRef = await categoryCollectionRef.add({
      name,
      fields,
      presets,
    });

    console.log('Category added successfully with ID:', docRef.id);
    return {
      ...categoryObj,
      id: docRef.id,
    };

  } catch (error) {
    console.error('Error adding category:', error);
  }
};

const deleteCategory = async (id, userId) => {
  try {
    const categoryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('data.categories')
      .doc(id);
    await categoryRef.delete();
    console.log('Category deleted successfully');
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

const updateCategory = async (id, categoryObj, userId) => {
  try {
    const categoryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('data.categories')
      .doc(id);
    await categoryRef.update(categoryObj);
    console.log('Category updated successfully');
  } catch (error) {
    console.error('Error updating category:', error);
  }
};


module.exports = {
  saveCategory,
  getCategoriesForUser,
  updateCategory,
  deleteCategory,
  saveDefaultCategories,
};
