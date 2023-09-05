const firestore = require('../utils/firestore')

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
};
