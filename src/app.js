const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static director to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Andrew'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'This is the help message', 
    title: 'Help',
    name: 'Andrew'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  const address = req.query.address

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return  res.send({ error })
      }

      res.send({
        location,
        forecast,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
   return res.send({
     error: 'You must provide a seach term'
   })
  }

  console.log(req.query.search)
  res.send({
    products: "xxx"
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'ERROR',
    name: 'Buffy Summers',
    errorMsg: 'The help page you are looking for not found'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: 'ERROR',
    name: 'Buffy Summers',
    errorMsg: 'This page is cannot be found'
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})


