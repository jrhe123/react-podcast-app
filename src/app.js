import React, {Component} from 'react';
import ReactDOM from 'react-dom';


// Store
import store from './stores';
import {Provider} from 'react-redux';



// Components
import {Featured} from './components/layout'


const app = (
	<Provider store={store.initialize()}>
		<Featured />
	</Provider>
)
			
ReactDOM.render(app, document.getElementById('root'));