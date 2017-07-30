import superagent from 'superagent';


// promise
import bluebird from 'bluebird';


module.exports = {

	get: (endopoint, params) => {

		return new Promise((resolve, reject) => {

			superagent
				.get(endopoint)
				.query(params)
				.set('Accept', 'application/json')
				.end((err, reponse) => {

					if(err){
						reject(err);
						return;
					}

					resolve(reponse.body);
				})
		})
	}
}