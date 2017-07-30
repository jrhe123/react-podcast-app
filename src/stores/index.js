import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';


// Reducers
import {podcastReducer} from '../reducers';


var store;

export default {

	initialize: () => {

		const reducers = combineReducers({
			podcast : podcastReducer
		})

		store = createStore(
			reducers,
			applyMiddleware(thunk)
		)

		return store
	},

	currentStore: () => {

		return store
	}

}