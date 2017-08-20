const express = require('express');
const router  = express.Router();

function createRoutes(knex) {
	router.get('/livebusdata', function (req, res) {
    //res.render('../build/index');
    knex('live_bus').then(data => res.json(data));
	});

	router.post('/livebusdata', (req, res) => {
		var liveBus = req.body.livebus;
			knex('live_bus').insert({
				LiveBus: liveBus
			})
	});
	
	router.get('/livebusdata', (req, res) => {
		const lat = req.body.params.lat
		const lng = req.body.params.lng
		const data = knex.raw(`SELECT * FROM bus_stops
      WHERE ST_DWithin(
        Geography(ST_MakePoint(CAST(lat as float), CAST(long as float))),
        Geography(ST_MakePoint(?, ?)),
        1 * 350
	  );`, [lat, lng])
    .then(data => res.json(data));

	})
	return router;
}
module.exports = createRoutes;
