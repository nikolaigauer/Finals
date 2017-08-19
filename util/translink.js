const request = require("request");

module.exports = knex => {
	return () => {
		var apiGet = "http://api.translink.ca/rttiapi/v1/buses?apikey=iLKjRZhiqjH0r0claiVf";
		request({
			url: apiGet,
			method: "GET",
			timeout: 3000,
		  headers: {
		      Accept:'application/JSON'
		  }
		}, function(error, response, body) {
				console.log(body);
				if (error) {
					console.log(error);
				} else {
					knex('live_bus').insert({
						LiveBus: body
					}).then(() => {});
				}
		});
	}
}
