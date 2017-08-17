
"use strict";

const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.get("/stops", (req, res) => {
    knex('stops') 
    .then((resultArray) => {
        let listOfMarkers = [];
        resultArray.forEach((row) => {
          let eachMarker = {};
          for (let key in row) {
            eachMarker[key] = row[key]
          }
          listOfMarkers.push(eachMarker);
        });
        res.json(listOfMarkers);
      }).catch((error) => {
        res.sendStatus(500);
      });
  });



  // "lat": 49.24858,
  // "long": -122.843968,

  //  select * from bus_stops where lat = '49.24858' and long = '-122.843968'
// knex.select('*').from('stops').where(lat: '49.24858', long: '-122.843968')