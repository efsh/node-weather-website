const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

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
    res.render('index', {
        title:'Personal page',
        name:'Eduardo Henriques'
    });
});

app.get('/about', (req, res) => {
    res.render('index', {
        title:'About page',
        name:'Eduardo Henriques',
        img: '<img src="./img/profile-small.jpg"/>'
    });
});

app.get('/help', (req, res) => {
    res.render('index', {
        title:'Help page',
        name:'Eduardo Henriques'
    });
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        title:'Weather page',
        name:'Eduardo Henriques'
    });
});

app.get('/weather/test', (req, res) => {

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
        forecast(data, (error, {temp, location}) => {
        
            if (error) {
                return console.log(error);
            }
    
            res.send({
                location : location,
                temp : temp
            });
            
        });

    });

})

app.get('*', (req, res) => {
    res.render('404', {
        name:'Eduardo Henriques'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});