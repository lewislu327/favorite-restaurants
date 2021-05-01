// install express 
const express = require('express')
const app = express()
const port = 3000

//require mongoose model
const Restaurant = require('./models/restaurant')

// require mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/favorite_restaurants', { 
  useNewUrlParser: true, useUnifiedTopology: true 
})

// require express-handlebars
const exphbs = require('express-handlebars');

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))
const restaurantList = require('./restaurant.json').results

// mongoose connection status 
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// route for home page 
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.eroor(error))
})
// route for new restaurant
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurant/new', (req, res) => {
  console.log(req.body)
  const newInfo = req.body
  return Restaurant.create(newInfo)
  .then(() => res.redirect('/')) 
  .catch(error => console.log(error))
})



// app local route
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})