const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const request = require('request-promise');

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
    uri: 'http://apidev.accuweather.com/locations/v1/search',
    qs: {
      q: 'req.params.city',
      apiKey: 'api-key',
    },
    json: true
  })
    .then((data) => {
      res.render('index', data)
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})

app.listen(3000, () => console.log(`Server is listening on port ${PORT}!`));
