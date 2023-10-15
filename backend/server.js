require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json());
var session = require('express-session');
const jwt = require('jsonwebtoken');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

const path = require('path');
const port = process.env.PORT || 3001
const APP_NAME = process.env.APP_NAME || 'webapp-template'

require('./features/passport')(app);
const {
  saveData,
  getData
} = require('./features/record');

const {
  saveCategory,
  getCategoriesForUser,
  updateCategory,
  deleteCategory,
} = require('./features/categories');

app.get('/api', (req, res) => {
  res.send('Hello World from API!')
})

app.get('/api/test', (req, res) => {
  const sampleData = {
    text: 'You are connected to the backend! ✅',
    randomData: Math.random(),
  };
  console.log(sampleData);
  res.send(sampleData);
})

function isAuth(req, res, next) {
  if (!req.headers['authorization']) {
    return res.sendStatus(403);
  }

  const token = req.headers['authorization'].split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

app.get('/api/test_protected', isAuth, (req, res) => {
  const sampleData = {
    text: 'You are authenticated to the backend! 🎉',
    randomData: Math.random(),
  };
  console.log(sampleData);
  res.send(sampleData);
})

// add new data
app.post('/api/data', isAuth, async (req, res) => {
  const data = req.body;
  // get user id from session
  const userId = req.user.username;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Missing request body"
    });
  }

  try {
    const result = await saveData(data, userId);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error saving data: " + err.message
    });
  }
});

// Listing data
app.get('/api/data', isAuth, async (req, res) => {

  // get user id from session
  const userId = req.user.username;

  try {
    const data = await getData(userId);

    res.json({
      success: true,
      data: data,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error retrieving data: " + err.message
    });
  }
});

// Deleting data
app.delete('/api/data/:id', isAuth, async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing id in the request URL"
    });
  }

  try {
    await deleteData(id);

    res.json({
      success: true,
      message: "Data deleted successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error deleting data: " + err.message
    });
  }
});

// Listing categories
app.get('/api/categories', isAuth, async (req, res) => {

  // get user id from session
  const userId = req.user.username;

  try {
    const categories = await getCategoriesForUser(userId);

    res.json({
      success: true,
      data: categories,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error retrieving categories: " + err.message
    });
  }
});

// add new category
app.post('/api/categories', isAuth, async (req, res) => {
  const category = req.body;
  // get user id from session
  const userId = req.user.username;

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Missing request body"
    });
  }

  try {
    const result = await saveCategory(category, userId);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error saving category: " + err.message
    });
  }
});

// update category
app.put('/api/categories/:id', isAuth, async (req, res) => {
  const id = req.params.id;
  const category = req.body;
  // get user id from session
  const userId = req.user.username;

  if (!id || !category) {
    return res.status(400).json({
      success: false,
      message: "Missing request body"
    });
  }

  try {
    const result = await updateCategory(id, category, userId);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error updating category: " + err.message
    });
  }
});

// delete category
app.delete('/api/categories/:id', isAuth, async (req, res) => {
  const id = req.params.id;
  // get user id from session
  const userId = req.user.username;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing id in the request URL"
    });
  }

  try {
    await deleteCategory(id, userId);

    res.json({
      success: true,
      message: "Category deleted successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error deleting category: " + err.message
    });
  }
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false,
  lastModified: false,
}));

// Serve your React app at the root path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html', {
    etag: false,
    lastModified: false,
  }));
});

const server = app.listen(port, () => {
  console.log(`${APP_NAME} listening on port ${port}`)
})
