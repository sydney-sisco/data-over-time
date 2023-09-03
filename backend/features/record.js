const firestore = require('../utils/firestore')

// save to a user's collection
const saveData = async (dataObj, userId) => {

  const name = dataObj.name || null;
  // name = caffeine

  // TODO: data can be an array of objects
  const data = dataObj.data || null;
  // {
  //  "units": "mg",
  //  "value": 160,
  //  "type": "rockstar pure zero punch",
  // }

  // generates a UTC timestamp in the format of YYYY-MM-DDTHH:MM:SSZ
  const createdAt = new Date().toISOString();

  try {
    // const { text, deviceId } = thoughtData; // thought destructure here
    const deviceId = null;
    const dataCollectionRef = firestore
      .collection('users')
      .doc(userId)
      .collection('data');
    const docRef = await dataCollectionRef.add({
      data,
      name,
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
