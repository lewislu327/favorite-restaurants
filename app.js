const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const session = require('express-session')
const port = 3000
const routes = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')
const flash = require('connect-flash') 

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
const restaurantList = require('./restaurant.json').results

app.use(session({
  secret: 'someRandomStuffs',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg') 
  next()
})

app.use(routes)

// app local route
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})