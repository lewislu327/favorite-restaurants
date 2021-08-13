const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// route for home page
router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  if (keyword) {
    return Restaurant.find({
      userId: userId,
      $or: [
        { name: { $regex: keyword, $options: '$i' } },
        { category: { $regex: keyword, $options: '$i' } }
      ]
    })
      .lean()
      .sort({ name: 'asc' })
      .then((restaurant) => res.render('index', { restaurant, keyword }))
      .catch((error) => console.error(error))
  }

  return Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.error(error))
})

module.exports = router
