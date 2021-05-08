const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


//  const { sort } = req.query;
//   Rest.find()
//     .lean()
//     .sort(sort)
//     .then((rests) => {
//       res.render("index",{rests,sort})
//     })
//     .catch(error=>console.log(error))


router.get('/ascending', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc'})
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.error(error))
})

router.get('/descending', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'desc'})
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.error(error))
})

router.get('/category', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: 'asc'})
    
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .then(() => res.location('/')) 
    .catch(error => console.error(error))
})

router.get('/region', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ region: 'asc'})
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.error(error))
})


module.exports = router