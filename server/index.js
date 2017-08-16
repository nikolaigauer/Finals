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
const api = require('../routes/translink');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'));

app.use('/api/getbusjson', api);

app.listen(3000, () => {
  console.log(`Server listening on port ${PORT} in ${ENV} mode.`);
});
