const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const pubDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine' , 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static content to serve
app.use(express.static(pubDirPath));

app.get('', (req, res) => {
    res.render('primary', {
        title:'Weather Website',
        name:'Eduardo Henriques'
    });
});

app.get('/about', (req, res) => {
    res.render('secondary', {
        title:'About',
        name:'Eduardo Henriques',
    });
});

app.get('/help', (req, res) => {
    res.render('secondary', {
        title:'Help page',
        name:'Eduardo Henriques'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.search){
        return res.send({
            error : 'Provide a search term'
        });
    }

    geocode(req.query.search, (error, data) => {

        if (error){
            return console.log(error);
        }
        
        //from ES6: 
        //{ temp, location }  -> object destructuring 
        forecast(data, (error, forecast) => {
        
            if (error) {
                return console.log(error);
            }
    
            res.send({
                location : forecast.location,
                temp : forecast.temp,
                icon : forecast.icon,
                description : forecast.description,
                humidity : forecast.humidity,
                feelslike: forecast. feelslike,
                uv : forecast.uv
            });
            
        });

    });

})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Eduardo Henriques'
    });
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});