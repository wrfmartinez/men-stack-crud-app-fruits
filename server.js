const express = require('express');
const app = express();

// dotenv package setup
const dotenv = require('dotenv');
dotenv.config();

// Connection to MongoDB database
const mongoose = require('mongoose');
const connect = () => {
  mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
}

app.get('/', (req, res) => {
  res.render('index.ejs');
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

connect();
