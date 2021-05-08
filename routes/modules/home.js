const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// route for home page 
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc'})
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.error(error))
})



module.exports = router