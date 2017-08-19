const express = require('express');
const router  = express.Router();
const request = require("request");

router.get('/', function (req, res) {

	var apiGet = "http://api.translink.ca/rttiapi/v1/buses?apikey=iLKjRZhiqjH0r0claiVf";
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
			console.log(body);
			res.json({body});

	});
});
router.post('/', (res,req) => {
	request('/api/getbusjson')
  res.redirect ('/');
})
module.exports = router;
