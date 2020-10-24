const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT

// Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directories to serve up
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Welcome to wether app',
        name: 'Anjan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Get more info about us',
        name: 'Anjan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Get more info about Website',
        name: 'Anjan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help center',
        name: 'Anjan'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.location) {
        return res.send({
            error: 'Please provide a location !'
        })
    }

    geocode(req.query.location, (error, data) => {
        if(error) {
            return res.send({error})
        }else {
            forecast(data.lattitude, data.longitude, (error, data) => {
                if(error) {
                    return res.send({error})
                }else {
                    res.send({
                        city:req.query.location,
                        data
                    })
                }
            })
        }
    })
}) 

app.get('*', (req, res) => {
    res.render('404-error', {
        name: 'Anjan'
    })
})

app.listen(port, () => {
    console.log(`Server is up at port ${port}`)
})