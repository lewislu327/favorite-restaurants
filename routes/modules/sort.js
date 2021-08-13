const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const { sort } = req.query
  const userId = req.user._id

  return Restaurant.find({ userId })
    .lean()
    .sort(sort)
    .then((restaurant) => {
      res.render('index', { restaurant, sort })
    })
    .catch((error) => console.error(error))
})

module.exports = router
