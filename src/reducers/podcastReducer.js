import constants from '../constants';

var initialState = {
	all: null,
	selected: null,
	trackList: null,


	test: null
}

export default (state = initialState, action) => {

	let updated = Object.assign({}, state)

	switch(action.type){

		case constants.PODCASTS_RECEIVED:

			console.log('In reducer: received');
			updated['all'] = action.podcasts;
			return updated;


		case constants.PODCAST_SELECTED:

			console.log('In reducer: received');

			// click on same album
			if(updated.selected != null){
				if(updated.selected.collectionId == action.podcast.collectionId){
					return state;
				}
			}

			// reset the trackList
			updated['trackList'] = null;
			updated['selected'] = action.podcast;
			return updated;


		case constants.TRACKLIST_READY:

			console.log('In reducer: received');

			updated['trackList'] = action.list;
			return updated;
				




		// Test action type in reducers
		case constants.PODCASTS_TEST:

			console.log('In reducer: received');
			updated['test'] = {
				id: 1,
				firstname: 'Roy',
				lastname: 'Test',
				title: 'Full Stack Dev',
				gender: 'Male'
			};
			return updated;



		default:
			return state;
	}

}