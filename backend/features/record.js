const firestore = require('@google-cloud/firestore');

const record = async (dataObj) => {

  const name = dataObj.name;
  // name = caffeine

  // check for the name field (required)
  if (!name) {
    res.status(400).send('Missing name field');
    return;
  }

  // check for the timestamp field (optional)
  const timestamp = dataObj.timestamp;

  if (timestamp && isNaN(Date.parse(timestamp))) {
    res.status(400).send('Invalid timestamp field');
    return;
  }

  // TODO: data can be an array of objects
  const data = dataObj.data;
  // {
  //  "units": "mg",
  //  "value": 160,
  //  "type": "rockstar pure zero punch",
  // }

  const document = {
    name,
    timestamp: timestamp || new Date().toISOString(),
  };

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
