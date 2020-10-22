const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2134fdfd22b88dc5a510b0dd8e8e15e5&query='+lattitude+','+longitude
    request({ url , json : true}, (error, data) => {
        if(error) {
            callback('Cannot connect to foercast services !', undefined)
        }else if(data.body.error) {
            callback('Invalid location search !!', undefined)
        }else {
            callback(undefined, {
                location:data.body.location.name,
                temperature:data.body.current.temperature,
                precipitation:data.body.current.precip,
                forecast:data.body.current.weather_descriptions
            })
        }
    })
}

module.exports = forecast