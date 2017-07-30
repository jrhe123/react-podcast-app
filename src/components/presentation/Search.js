import React, {Component} from 'react';

// Pure static view component

export default (props) => {

	return (

		<div>
			<div className="form-inputs p-20">
				<div>
				    <div className="input-field animated fadeinright">
				    	
				      	<input  onKeyDown={props.onSearch.bind(this)}
				      			id="search"
				      			type="text" 
				      			placeholder="Search your album here.."/>

				    </div>
			    </div>				      
			</div>
		</div>
	)
}