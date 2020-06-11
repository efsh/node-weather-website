const request = require('postman-request');

const fore = ({lat, long} = {}, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=aff52c283b8d9e6fff6deb3bd7527364&query=" + lat + "," + long;

    request({url , json: true}, (error, { body }) => {

        if (error) {
            callback('API inacessível', undefined);
        } else if (body.current == undefined) {
            callback('Cidade não localizada', undefined);
        } else {
            const temp = {
                temp: body.current.temperature,
                location: body.location.name + 
                ' / ' + body.location.region + 
                ' - ' + body.location.country
            } 
                
            callback(undefined, temp);
        }
    });

};

module.exports = fore;