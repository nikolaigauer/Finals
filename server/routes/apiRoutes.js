const express = require('express');
const router  = express.Router();

function createRoutes(knex) {


	router.get('/', function (req, res) {
    res.render('client/index.html');
	});
  
	router.post('/livebusdata', (req, res) => {
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
