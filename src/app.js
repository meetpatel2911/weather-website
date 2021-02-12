const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

//Define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setub handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Meet'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Meet'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help!!',
        msg: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
        name: 'Meet'
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
    
        forecast(data.location, (error, data=0) => {
            if(error){
                return res.send({error})
            }else{
                res.send({data})
            }
          })
    })
    // res.send({
    //     forecast: 'Cloudy',
    //     location: 'India',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMsg:'Help article Not Found!'
        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg:'404 Page Not Found!'
        
    })
})
//app.com
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})








