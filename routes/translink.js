const express = require('express');
const request = require("request");

function createRoutes(knex) {
	const router  = express.Router();

	router.get('/', function (req, res) {

		var apiGet = "http://api.translink.ca/rttiapi/v1/buses?apikey=GMPEN4nbnZxrUBYQYkVh";
		request({
			url: apiGet,
			method: "GET",
			timeout: 3000,
	    headers: {
	        Accept:'application/JSON'
	    }
		}, function(error, response, body) {
				if (error) {
					console.log(error);
					res.send('Api limit has been reached' );
				}
				res.send(body);
		});
	});

	router.post('/', (req, res) => {
		console.log("this is req body", req.body)
		var liveBus = req.body;
		if (liveBus.length === 0){
			res.redirect('/')
		} else {
			knex('live_bus').insert({
				LiveBus: liveBus
			}).then((live_bus) => {
				res.redirect('/');
			});
		}
	});
	return router;
}
module.exports = createRoutes;
