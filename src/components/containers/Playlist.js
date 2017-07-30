import React, {Component} from 'react';


// Components
import {Search} from '../presentation';


// API
import {APIClient} from '../../utils';


// Redux
import {connect} from 'react-redux';
import actions from '../../actions';




// Audio
import APlayer from 'aplayer';



class Playlist extends Component{


	constructor(props){
		super(props);

		this.state = {
			player: null
		}
	}

	initializePlayer(list){

		// limit 3
		let sublist = [];
		if(list.length > 3){
			for(var i = 0; i < 3; i++){
				sublist.push(list[i]);
			}
		}else{
			sublist = Object.assign([], list);
		}

		var ap1 = new APlayer({
		    element: document.getElementById('player1'),
		    narrow: false,
		    autoplay: true,
		    showlrc: false,
		    mutex: true,
		    theme: '#e6d0b2',
		    preload: 'metadata',
		    mode: 'circulation',
		    music: sublist
		});
		// ap1.on('play', function () {
		//     console.log('play');
		// });
		// ap1.on('play', function () {
		//     console.log('play play');
		// });
		// ap1.on('pause', function () {
		//     console.log('pause');
		// });
		// ap1.on('canplay', function () {
		//     console.log('canplay');
		// });
		// ap1.on('playing', function () {
		//     console.log('playing');
		// });
		// ap1.on('ended', function () {
		//     console.log('ended');
		// });
		// ap1.on('error', function () {
		//     console.log('error');
		// });

		this.setState({
			player: ap1
		})
	}


	// Receive from child component
	onSearch(e){

		var enter = e.keyCode;
		if(enter !== 13){
			return;
		}

		var value = e.target.value;
		const url = "/search/" + value;
		APIClient
			.get(url, null)
			.then(reponse => {

				console.log('call props method which trigger the action');
				this.props.podcastsReceived(reponse.results);

			})
			.catch(err => {

				console.log("eror: " + JSON.stringify(err));
			})
	}



	
	// When redux store update the state, this function called
	componentDidUpdate(){

		console.log('selected pod and component updated: ', this.props.podcasts.selected);

		if(this.props.podcasts.selected == null){
			return;
		}

		const feedUrl = this.props.podcasts.selected['feedUrl'];
		if(feedUrl == null){
			return;
		}

		if(this.props.podcasts.trackList != null){
			if(this.state.player == null){

				// use the list from reducer to init
				this.initializePlayer(this.props.podcasts.trackList);
			}
			return;
		}

		if(this.state.player != null){
			this.state.player.pause()

			this.setState({
				player: null
			})
		}


		APIClient
			.get('/feed', {url: feedUrl})
			.then(reponse => {

				const podcast = reponse.podcast;
				const item = podcast.item;

				let list = [];
				item.forEach((track, i) => {

					var trackInfo = {};
					trackInfo['title'] = track.title[0]; 
					trackInfo['author'] = this.props.podcasts.selected.collectionName;
					trackInfo['pic'] = this.props.podcasts.selected['artworkUrl600'];
					let enclosure = track.enclosure[0]['$'];
					trackInfo['url'] = enclosure['url'];
					
					list.push(trackInfo);
				})


				// User redux store
				this.props.trackListReady(list);


				//console.log('fetch list: ',list);
			})
			.catch(err => {

				console.log("eror: " + JSON.stringify(err));
			})

	}


	render(){

		return(
			<div>
				<div style={{paddingTop:'64px'}} className="hero-header bg-shop animated fadeindown">
					<div className="p-20 animated fadeinup delay-1">
						<div style={{background:'#fff'}} id="player1" className="aplayer"></div>
					</div>
				</div>

				<a href="#"
				   className="waves-effect waves-light btn-large primary-color block animated bouncein delay-1" 
				   onClick={this.test.bind(this)}>ABOUT ME</a>
				
				<Search onSearch={this.onSearch.bind(this)} />		
			</div>
		)
	}


	test(){
		// Trigger the props method to call action		
		this.props.podcastsTest({test:true});
	}

}


// Connect with Props Methods
const stateToProps = (state) => {
	return {
		// matched to store.js reducer name
		podcasts: state.podcast
	}
}
const dispatchToProps = (dispatch) => {

	// connected to actions
	return {
		podcastsReceived: (podcasts) => dispatch(actions.podcastsReceived(podcasts)),

		trackListReady: (list) => dispatch(actions.trackListReady(list)),


		// Test dispatch to action
		podcastsTest: (podcasts) => dispatch(actions.podcastsTest(podcasts))
	}
}

export default connect(stateToProps, dispatchToProps) (Playlist);