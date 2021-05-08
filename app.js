// install express 
const express = require('express')
// require express-handlebars
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

const routes = require('./routes')
require('./config/mongoose')




//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



// setting static files
app.use(express.static('public'))
const restaurantList = require('./restaurant.json').results

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)




// app local route
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})