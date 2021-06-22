const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2655a763f0b0800e9a8b179df8b5339e&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const fixedval =((response.body.current.temperature-32)*5/9).toFixed(2)
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " +fixedval  + " degress out.")
        }
    })
}

module.exports = forecast