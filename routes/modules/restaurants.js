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
  const errors = []

  if (!name || category === '選擇餐廳類型') {
    errors.push({ message: '餐廳名稱&類型為必填欄位。' })
  }

  if (errors.length) {
    return res.render('new', {
      errors,
      name,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description
    })
  }

  return Restaurant.create({ name, category, location, phone, rating, image, google_map, description, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// route for detail page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.log(error))
})

//route for edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      restaurant.name = req.body.name.trim()
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.rating = req.body.rating
      restaurant.google_map = req.body.google_map
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error))
})

//route for delete item
router.delete('/:id/', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
