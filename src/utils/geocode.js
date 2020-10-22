const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW5qYW50ZXdhbmkiLCJhIjoiY2tieGlrOTdlMHE4dDJzcnp1aGozZDFlNyJ9.Q031iUHmmrDPA8yb2LxGxg&limit=1'

    request({ url , json : true}, (error, data) => {
        if(error) {
            callback('Unable to connect geocode services !',undefined)
        } else if(data.body.features.length === 0){
            callback('Invalid location search ... enter a valid location',undefined)
        } else{
            callback(undefined, {
                location:data.body.features[0].place_name,
                lattitude:data.body.features[0].center[1],
                longitude:data.body.features[0].center[0]
            })
        }
    } )
}

module.exports = geocode