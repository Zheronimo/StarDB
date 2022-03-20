import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';

export default class App extends Component {
	state = {
		showRandomPlanet: true
	}
	
	render() {
		return (
			<div className='container'>
				<Header />
				<RandomPlanet />
				<PeoplePage />
			</div>
		)
	}
}