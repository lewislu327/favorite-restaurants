const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// route for home page 
router.get('/', (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc'})
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.error(error))
})



module.exports = router