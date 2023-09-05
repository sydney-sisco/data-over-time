const firestore = require('../utils/firestore')

// save to a user's collection
const saveData = async (dataObj, userId) => {

  const category = dataObj.category || null;
  const values = dataObj.values || null;
  const createdAt = new Date().toISOString(); // YYYY-MM-DDTHH:MM:SSZ

  try {
    const deviceId = null;
    const dataCollectionRef = firestore
      .collection('users')
      .doc(userId)
      .collection('data');
    const docRef = await dataCollectionRef.add({
      values,
      category,
      deviceId,
      createdAt: createdAt,
      updatedAt: createdAt,
    });
    console.log('Data added successfully with ID:', docRef.id);
    return {
      ...dataObj,
      id: docRef.id,
      createdAt: createdAt,
      updatedAt: createdAt,
    };
  } catch (error) {
    console.error('Error adding data:', error);
  }
};

const getDataByDateModified = async (userId, lastSyncTime) => {
  try {
    const dataRef = firestore
      .collection('users')
      .doc(userId)
      .collection('data')
      // .where('updatedAt', '>', lastSyncTime)
      .orderBy('updatedAt', 'desc');
    const snapshot = await dataRef.get();
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

module.exports = { saveData, getData: getDataByDateModified };
