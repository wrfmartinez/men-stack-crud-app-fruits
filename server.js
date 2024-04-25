const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import the Fruit model
const Fruit = require('./models/fruit');

/* ---- CONFIGURATIONS ---- */
const app = express();
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

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
