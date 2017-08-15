const request = require("request");
var translink = () => {
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
			} else {
				request({
					url: "/livebusdata",
					method: "POST"
				});
			}
	});
}


// // set timeout way
//
//
// setTimeout(3000, translink);
//
// //
//
//
//
// module.exports = translink;
//
//
// //
//
// // export function way
//
// translinkFunction = require('./translink')
//
// app.post('/wherever') { translinkFunction() }
