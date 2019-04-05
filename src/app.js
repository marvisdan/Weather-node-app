const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, ('../public'));
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath); /* customizing views directory with name "templates" */
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // Define home page in default route path in using static directory context

// Define routes app
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Marvis DAN',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About weather app',
    name: 'Marvis DAN',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help weather app',
    message: 'Call 911 if you need help',
    name: 'Marvis DAN',
  });
});

app.get('/weather', (req, res) => {
  console.log('query', req.query.address);
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'provide a address term',
    });
  }

  geoCode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address,
        location,
        message: forecastData,
      });
    });
  })
});

app.get('/products', (req, res) => {
  console.log('query', req.query);
  if (!req.query.search) {
    return res.send({
      error: 'provide a search term'
    });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Marvis DAN',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Marvis DAN',
  });
});

// Define local port
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
