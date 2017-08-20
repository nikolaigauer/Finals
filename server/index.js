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



const api = require('./routes/apiRoutes')(knex);
const liveBusData = require('../util/translink')(knex);
const cordinates = require('./routes/UserCordinates')(knex);
app.use('/api', api);
app.use('/api', cordinates);

const getStopNumbers = ({ rows }) => rows.map(r => {
    return {
      stop: r.stop_number, 
      lat: r.lat, 
      lng: r.long
    }
  });

const getLiveBusLocations = busIds => {
  console.log('bus id arrray', busIds);
  const testStop = parseInt(busIds[0])
  console.log('this is bus id with an index of 0:', testStop)

  var apiGet = `http://api.translink.ca/rttiapi/v1/stops/${testStop}/estimates?apikey=iLKjRZhiqjH0r0claiVf&count=3&timeframe=60`;
  return request({
    url: apiGet,
    method: "GET",
    timeout: 3000,
    headers: {
        Accept:'application/JSON'
    }
  })
}

app.get('/get_buses_in_proximity', (req, res) =>{
  const { lat, lng } = req.query;
  // const lat = 49.27766072946756
  // const lng = -123.11262130737305

  console.log('lat', lat);
  console.log('lng', lng);
  const sqlQuery = `SELECT *
    FROM bus_stops
    WHERE ST_DWithin( Geography(ST_MakePoint(CAST(lat as float),
          CAST(long as float))),
          Geography(ST_MakePoint(${lat}, ${lng})),
          150);`

  knex.raw(sqlQuery)
      .then(getStopNumbers)
      .then(function (stops){
        res.json(stops)
      })
//       // // .then(getLiveBusLocations)
//       // .then(function (busIds) {
//       //   console.log(busIds)
//       //   res.json(JSON.parse(busIds))
//       // })
  })

	// app.get('/livebusdata', (req, res) => {
	// 	const lat = req.body.params.lat
	// 	const lng = req.body.params.lng
	// 	const data = knex.raw(`SELECT * FROM bus_stops
  //     WHERE ST_DWithin(
  //       Geography(ST_MakePoint(CAST(lat as float), CAST(long as float))),
  //       Geography(ST_MakePoint(?, ?)),
  //       1 * 350
	//   );`, [lat, lng])
  //   .then(data => res.json(data));
	// })

app.listen(3000, () => {
// setInterval(liveBusData, 5000);
// liveBusData()
  console.log(`Server listening on port ${PORT} in ${ENV} mode.`);
}); 