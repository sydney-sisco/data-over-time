const firestore = require('@google-cloud/firestore');

const record = async (dataObj) => {

  const name = dataObj.name;
  // name = caffeine

  // TODO: data can be an array of objects
  const data = dataObj.data;
  // {
  //  "units": "mg",
  //  "value": 160,
  //  "type": "rockstar pure zero punch",
  // }

  const document = {
    timestamp: new Date().toISOString(),
  };

  if (name) {
    document.name = name;
  }

  if (data) {
    document.data = data;
  }

  // Save the data to Firestore
  const db = new firestore.Firestore({
    projectId: 'demo-test',
  });

  const savedObj = await db.collection('data').add(document)

  return savedObj;
};

module.exports = { record };
