require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json());
var session = require('express-session');

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
const { record } = require('./features/record');

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

app.post('/api/record', (req, res) => {
  const data = req.body;
  const result = record(data);
  if (result) {
    res.send(result);
  } else {
    res.status(500).send('Error saving data');
  }
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve your React app at the root path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(port, () => {
  console.log(`${APP_NAME} listening on port ${port}`)
})

const io = require('./utils/socket')(server);
require('./features/socketPing')(io);
