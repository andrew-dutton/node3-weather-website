const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/f87e500505080d421936ff0cd1a16333/' + lat +',' + long + '?units=si'

  request({url, json: true}, (error, { body }) => {
    if(error) {
      callback('Could not connect to weather API')
    } else if(body.code === 400) {
      callback(body.error)
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' and there is a ' + body.currently.precipProbability + '% chance of rain. Today\'s UV Index: ' + body.currently.uvIndex)
    }
  })
}

module.exports = forecast
