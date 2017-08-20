// // retrive log and lat when user clicks on map
//   // store it in 
    // SELECT * FROM bus_stops
    //   WHERE ST_DWithin(
    //     Geography(ST_MakePoint(CAST(lat as float), CAST(long as float))),
    //     Geography(ST_MakePoint(49.27887861484944, -123.12371492385864)),
    //     1 * 350
    //   );

const express = require('express');
const router  = express.Router();

function createCords(knex) {

  router.get('/latest_user_coord', function (req, res) {
    knex('users').then(data => res.json(data));
	});

  router.post('/latest_user_coord', (req, res) => {
    var lat = req.body.lat;
    var long = req.body.long;
      knex('users').insert({
        lat: lat,
        long: long
      })
    });
  return router;
}
module.exports = createCords;
