"use strict"; 

var request = require('request');
var YahooWeather = function() {};

YahooWeather.prototype.getForecast = function(location, callback) { 
	var q = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + location + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	return get(q, callback); 
}

YahooWeather.prototype.getCurrent = function(location, callback) { 
	var q = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + location + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	return get(q, callback);
}

var get = function(querystr, callback) { 
	var b; 
	// console.log('invoking for ' + querystr + '...');
	request(querystr, function(error, response, body) { 
		// console.log(body); 
		callback(error, response, body);
	});
}	

module.exports = new YahooWeather();
