const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const request = require('request-promise');
const dotenv = require('dotenv').config();

const app = express();
const PORT = 3000;

app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/:city', (req, res) => {
  request({
    uri: 'http://api.openweathermap.org/data/2.5/weather',
    qs: {
      q: req.params.city,
      apiKey: process.env.API_KEY
    },
    json: true
  })
    .then((data) => {
      res.render('home', data)
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})

app.listen(3000, () => console.log(`Server is listening on port ${PORT}!`));
