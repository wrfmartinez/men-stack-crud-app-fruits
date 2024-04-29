const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Import the Fruit model
const Fruit = require('./models/fruit');

/* ---- CONFIGURATIONS ---- */
const app = express();

// Parses incoming request bodies, extracts form data then converts it into an object
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// Loads the environment variables from .env
dotenv.config();

// Connection to MongoDB database
mongoose.connect(process.env.MONGODB_URI);

// Log connection confirmation to terminal
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

/* ---- ROUTES ---- */
// Renders the landing page
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Method:GET Endpoint/URI:(/fruits/new) Presents the user with a form to add a fruit
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs');
});

// Method:GET Endpoint/URI:(/fruits/:fruitId) Renders a show page for a specific fruit
app.get('/fruits/:fruitId', async (req, res) => {
  // mongoose will find the fruit based on the id value in the param within the route
  // index.ejs has links referencing a route to '/fruits/fruit._id
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render('fruits/show.ejs', { fruit: foundFruit });
});

// Method:GET Endpoint/URI:(/fruits) Read all fruits and passes it to the index.ejs in the views/fruits directory
app.get('/fruits', async (req, res) => {
  const allFruits = await Fruit.find();
  res.render('fruits/index.ejs', { fruits: allFruits });
});

// Method:POST Endpoint/URI:(/fruits) Create a new fruit then redirects to any endpoint of your choosing. In this case, /fruits/new route
app.post('/fruits', async (req, res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  // Creates a fruit object within the database based on user form submission data
  await Fruit.create(req.body);
  res.redirect('/fruits');
});

// Method:DELETE Endpoint/URI:(/fruits/:fruitId) Deletes a specific fruit
app.delete('/fruits/:fruitId', async (req, res) => {
  const foundFruit = await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect('/fruits');
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
