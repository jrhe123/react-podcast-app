var express = require('express');
var router = express.Router();



// superagent
var superagent = require('superagent');




router.get('/:term', function(req, res, next) {

	var term = req.params.term;

	// itune search API
	var url = 'http://itunes.apple.com/search';
	var query = {
		media: 'podcast',
		term: term
	};

	superagent
		.get(url)
		.query(query)
		.set('Accept', 'application/json')
		.end(function(err, reponse){

			if(err){
				res.json({
					confirmation: 'fail',
					reponse: err
				});
				return;
			}

			var data = JSON.parse(reponse.text);
			res.json({
				confirmation: 'success',
				results: data.results
			});
		})
	
});

module.exports = router;
