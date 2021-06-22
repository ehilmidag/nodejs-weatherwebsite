const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../src/forecast')
const geocode = require('../src/geocode')



const app = express()
//Define path of express  config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials' )
//Setup Handlebars Engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup Static Server to serve
app.use(express.static(publicDirectory))


app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Hillheim'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error: 'please type a adress'
        })
    }
    geocode(req.query.adress, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error:'Cant find your coordinates'
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error:'cant find data about your location'
                })
            }
            else{
                return res.send({
                    forecastpre:forecastData,
                    location
                })
            }
        })
    })
    

    

})
app.get('/product',(req,res)=>{
    if(!req.query.search) {
        
       return res.send({
            error:'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
    })

app.get('/about', (req,res)=>{
    res.render('about',{
        img:'/img/me.png',
        title:'About me',
        name:'Hillheim'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        info:'how may i help you?',
        title:'HELP',
        name:'Hillheim'
    })
})



app.get('/mainpage', (req, res) => {
    res.send('<h1>love from mainpage <3</h1><b1><h2>Welcome!!!</h2>')

})


//app.com
//app.com/mainpage
//app.com/help
app.get('/help/*',(req,res)=>{
    res.render('404',{
        info:'Sorry Help  you seek not found',
        title:'404'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        info:'Sorry page that you seek not found',
        title:'404'
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})