import React, {Component} from 'react';


// Redux
import {connect} from 'react-redux';
import actions from '../../actions';



class Podcasts extends Component{

	selectPodcast(podcast, event){
		console.log(podcast);
		this.props.podcastSelected(podcast)
	}


	render(){

		const list = this.props.podcasts.all || [];


		// Test data from reducers
		const test = this.props.podcasts.test || {};
		console.log('test from reducer: ',test);
		let display_content;
		if(test.id){
			display_content = (
				<div className="my-info-form">
					<h1>My Information</h1>
					<p>First name: {test.firstname}</p>
					<p>Last name: {test.lastname}</p>
					<p>Title: {test.title}</p>
					<p>Gender: {test.gender}</p>
				</div>
			)
		}else{
			display_content = (
				<div></div>
			)
		}


		return(
			<div>
				{display_content}
				{
					list.map((podcast, i) => {
						return (
							<div key={i} 
								 className={'shop-banner animated fadeinup delay-' + i}>
					            <a href="#"
					               onClick={this.selectPodcast.bind(this, podcast)}>
					              <img src={podcast.artworkUrl600} alt="" />
					              <div className="opacity-overlay valign-wrapper">
					                <div className="valign center width-100">
					                  <h3 className="white-text">{podcast.collectionName}</h3>
					                  <p className="white-text">{podcast.artistName}</p>
					                </div>
					              </div>
					            </a>
					        </div>
						)
					})
				}
					  			          
			</div>
		)
	}
}

// Connect with Props Methods
const stateToProps = (state) => {
	return {
		// matched to store.js reducer name
		podcasts: state.podcast,


		// Test state to props from reducer
		test: state.podcast,
	}
}

const dispatchToProps = (dispatch) => {

	// connected to actions
	return {

		podcastSelected: (podcast) => dispatch(actions.podcastSelected(podcast))
	}
}

export default connect(stateToProps, dispatchToProps)(Podcasts);