// require mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/favorite_restaurants', { 
  useNewUrlParser: true, useUnifiedTopology: true 
})


// mongoose connection status 
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db