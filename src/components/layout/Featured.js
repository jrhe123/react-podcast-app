import React, {Component} from 'react';


// Components
import {Footer, Nav} from '../presentation';
import {Podcasts, Playlist} from '../containers';


class Featured extends Component{

	render(){

		return(
			<div>
				<div id="main"> 

					<div id="content" className="main animated fadein">

						<Playlist />						
						
						<div className="animated fadeinup delay-1">
							<Podcasts />
							<div className="clr"></div>
						</div>
					</div>

					<Footer />
				</div> 

				<Nav />

			</div>
		)
	}
}

export default Featured;