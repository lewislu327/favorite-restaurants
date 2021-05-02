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
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.eroor(error))
})
// route for new restaurant
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurant/new', (req, res) => {
  const newInfo = req.body
  return Restaurant.create(newInfo)
  .then(() => res.redirect('/')) 
  .catch(error => console.log(error))
})
// route for detail page
app.get('/detail/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//route for edit page
app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((restaurant) => res.render('edit', { restaurant }))
  .catch(error => console.log(error))

})
app.post('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id 
  return Restaurant.findById(id)
  .then( restaurant => {
    restaurant.name = req.body.name
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.rating = req.body.rating
      restaurant.google_map = req.body.google_map
      restaurant.description = req.body.description
      return restaurant.save()
  })
  .then( () => res.redirect(`/detail/${id}`))
  .catch( error => console.log(error))
})

//route for delete item
app.post('/restaurant/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// app local route
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})