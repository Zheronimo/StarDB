import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';

import './item-list.css';

export default class ItemList extends Component {
	swapi = new SwapiService(); //инициализируем наш API клиент
	state = {
		name: null,
	}

	updatePeople() {
		this.swapi.getAllPeople().then(body => {
			body.forEach(element => {
				this.setState()
			})
		})
	}

	render() {
		return (
			<ul className="item-list list-group">
				<li className="list-group-item">Luke Skywalker</li>
				<li className="list-group-item">Darth Vader</li>
				<li className="list-group-item">R2-D2</li>
			</ul>
		);
	}
}