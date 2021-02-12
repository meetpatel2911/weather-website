const request = require('request')

const forecast = (address,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(address)+'&APPID=984afc00f729272153bc54385b401bcb'

    request({ url: url,json:true }, (error, response) => {
        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        }
        else if(response.body.message){
            callback('Some error in query url!',undefined)
    
        }
        
        else{
            callback(undefined,'Weather Forcast : Today there will be '+ response.body.weather[0].description)
        }
        
    })

}


module.exports = forecast

