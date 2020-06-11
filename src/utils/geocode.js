const request = require('postman-request');

const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(city) + '.json?access_token=pk.eyJ1IjoiamFjb25lIiwiYSI6ImNrYjFlaDR1YzAxaWkyc210Mno0ZjM5YncifQ.-OTB8XG9JKDNEtjgzDU62Q';

    //from ES6: 
    //url       -> object property shorthand
    //{ body }  -> object destructuring 
    request({url , json: true}, (error, { body }) => {
        if (error) {
            callback('API inacessível', undefined);
        } else if (body.features.length === 0) {
            callback('Cidade [' + city + '] não localizada', undefined);
        } else {
            const latlong = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, latlong);
        }
    });
};

module.exports = geocode;