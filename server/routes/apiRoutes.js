const express = require('express');
const router  = express.Router();

function createRoutes(knex) {
	router.get('/livebusdata', function (req, res) {
    //res.render('../build/index');
    knex('live_bus').then(data => res.json(data));
	});

	// localhost:3000/livebusData should display all the current live busses at the time
	// using that data, we will then map through each object and store long lat and recording time in a arrray
	// using the array, we can store the long and lat and recorded time in bus tables
	router.post('/livebusdata', (req, res) => {
		var liveBus = req.body.livebus;
			knex('live_bus').insert({
				LiveBus: liveBus
			})
	});
	return router;
}
module.exports = createRoutes;
