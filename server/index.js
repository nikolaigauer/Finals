"use strict";
require('dotenv').config();
const express = require('express');
const bodyParser  = require("body-parser");
// const request = require("request");
var request = require('request-promise');
var cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const knexConfig  = require("./knexfile.js");
const knex = require("knex")(knexConfig[ENV]);
console.log('config stuff', knexConfig[ENV]);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



// const api = require('./routes/apiRoutes')(knex);
// const liveBusData = require('../util/translink')(knex);
// // const cordinates = require('./routes/UserCordinates')(knex);
// app.use('/api', api);
// app.use('/api', cordinates);

const getStopNumbers = ({ rows }) => rows.map(r => r.stop_number);

const getLiveBusLocations = busIds => {
  console.log('bus id arrray', busIds);
  var apiGet = "http://api.translink.ca/rttiapi/v1/buses?apikey=GMPEN4nbnZxrUBYQYkVh";
  request({
    url: apiGet,
    method: "GET",
    timeout: 3000,
    headers: {
        Accept:'application/JSON'
    }
  }).then(console.log)
}

app.get('/get_buses_in_proximity', (req, res) =>{
  const { lat, lng } = req.query;
  console.log('lat', lat);
  console.log('lng', lng);


  // TODO - use ?,? to escape the params
  // cuz sql injection is sucky
  const sqlQuery = `SELECT *
    FROM bus_stops
    WHERE ST_DWithin( Geography(ST_MakePoint(CAST(lat as float),
          CAST(long as float))),
          Geography(ST_MakePoint(49.27887861484944, -123.12371492385864)),
          1 * 100);`

  knex.raw(sqlQuery)
      .then(getStopNumbers)
      .then(getLiveBusLocations);
  // knex('bus_stops').where('id', 1).then(console.log);
  res.json('yippy!!!');
})


app.listen(3000, () => {
  // setInterval(liveBusData, 5000);
  // liveBusData()
  console.log(`Server listening on port ${PORT} in ${ENV} mode.`);
});
