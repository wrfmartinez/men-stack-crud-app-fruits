const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import the Fruit model
const Fruit = require('./models/fruit');

/* ---- CONFIGURATIONS ---- */
const app = express();
/* Parses incoming request bodies, extracts form data
   then converts it into an object */
app.use(express.urlencoded({ extended: false }));
// Loads the environment variables from .env
dotenv.config();
// Connection to MongoDB database
mongoose.connect(process.env.MONGODB_URI);
// Log connection confirmation to terminal
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

/* ---- ROUTES ---- */
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// This route presents the user with a form
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs');
});

// This route creates a fruit
app.post('/fruits', async (req, res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  /* Creates a fruit object within the database based on
     user form submission data */
  await Fruit.create(req.body);
  res.redirect('/fruits/new');
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
