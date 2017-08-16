"use strict";
require('dotenv').config();
const express = require('express');
const bodyParser  = require("body-parser");
const request = require("request");
const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const knexConfig  = require("../knexfile.js");
const knex = require("knex")(knexConfig[ENV]);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const api = require('./routes/apiRoutes')(knex);
const liveBusData = require('../util/translink')(knex);
const stops = require('../queries/renderStops.js');

app.use('/markers', stops);
app.use('/api', api);


app.listen(3000, () => {
  //setInterval(liveBusData, 5000);
  stops();
  console.log(`Server listening on port ${PORT} in ${ENV} mode.`);
});
