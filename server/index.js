"use strict";
require('dotenv').config();
const express = require('express');
const bodyParser  = require("body-parser");
const request = require("request");
const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const api = require('./routes/apiRoutes')(knex);


const knexConfig  = require("../knexfile.js");
const knex = require("knex")(knexConfig[ENV]);

const liveBusData = require('../routes/translink')(knex);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

app.use('/', api);

app.listen(3000, () => {
  console.log(`Server listening on port ${PORT} in ${ENV} mode.`);
});
