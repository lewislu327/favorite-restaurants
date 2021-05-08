const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/new', (req, res) => {
  const name = req.body.name.trim() 
  if (name.length === 0){
    res.send('please enter valid word') 
  }
  const newInfo = req.body
  return Restaurant.create(newInfo)
  .then(() => res.redirect('/')) 
  .catch(error => console.log(error))
})

// route for detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//route for edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((restaurant) => res.render('edit', { restaurant }))
  .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id 
  return Restaurant.findById(id)
  .then( restaurant => {
    restaurant.name = req.body.name.trim()
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
  .then( () => res.redirect(`/detail/${id}`))
  .catch( error => console.log(error))
})

//route for delete item
router.delete('/:id/', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router