const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/new', (req, res) => {
  const userId = req.user._id
  const name = req.body.name.trim() 
  const { category, location, phone, rating, image, google_map, description } = req.body

  if (name.length === 0){
    res.send('please enter valid word') 
  }

  return Restaurant.create({ name, category, location, phone, rating, image, google_map, description, userId })
  .then(() => res.redirect('/')) 
  .catch(error => console.log(error))
})

// route for detail page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//route for edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
  .lean()
  .then((restaurant) => res.render('edit', { restaurant }))
  .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id 
  return Restaurant.findOne({ _id, userId })
  .then( restaurant => {
    restaurant.name = req.body.name.trim();
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.rating = req.body.rating
    restaurant.google_map = req.body.google_map
    restaurant.description = req.body.description

    if (restaurant.name.length === 0 ) {
      res.send('please enter valid name')
    }

    return restaurant.save()
  })
  .then( () => res.redirect(`/restaurants/${_id}`))
  .catch( error => console.log(error))
})

//route for delete item
router.delete('/:id/', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router