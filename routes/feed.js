var express = require('express');
var router = express.Router();



// superagent
var superagent = require('superagent');



// xml to json
var xml2js = require('xml2js');




router.get('/', function(req, res, next) {
	
	var url = req.query.url;

	if(url == null){
		res.json({
			confirmation: 'fail',
			response: 'Missing Feed Url'
		});
	}

	superagent
		.get(url)
		.query(null)
		.end(function(err, response){

			if(err){
				res.json({
					confirmation: 'fail',
					response: err
				});
				return;
			}

			var xml = response.text;
			if(xml == null){
				res.json({
					confirmation: 'fail',
					response: 'Not found'
				});
				return;
			}

			xml2js.parseString(xml, function (err, result) {
				var out = {};
				if(result.rss.channel.length > 0){
					out = result.rss.channel[0];
				}
			    res.json({
			    	confirmation: 'success',
					podcast: out
			    });
			});
		})
	
});

module.exports = router;
