import constants from '../constants';


// send action to reducers

export default {

	searchPodcasts: (params) => {

		console.log(JSON.stringify(params));
	},

	podcastsReceived: (podcasts) => {

		console.log('call action here, then send it to reducers');

		return {
			type: constants.PODCASTS_RECEIVED,
			podcasts: podcasts
		}
	},

	podcastSelected: (podcast) => {

		console.log('call action here, then send it to reducers');

		return {
			type: constants.PODCAST_SELECTED,
			podcast: podcast
		}
	},

	trackListReady: (list) => {

		return {
			type: constants.TRACKLIST_READY,
			list: list
		}
	},



	// Test Action
	podcastsTest: (podcasts) => {

		return {
			type: constants.PODCASTS_TEST,
			podcasts: podcasts
		}
	}
}