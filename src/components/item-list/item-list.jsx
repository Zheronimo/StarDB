import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {
	swapiService = new SwapiService(); //инициализируем наш API клиент
	state = {
		peopleList: null,
		loading: true,
		error: false
	}

	componentDidMount() {
		this.swapiService
			.getAllPeople()
			.then((peopleList) => {
				this.setState({
					peopleList,
					loading: false
				});
			})
			.catch(this.onError);
	}

	renderItems(arr) {
		return arr.map(({id, name}) => {
			return (
				<li className='list-group-item' key={id} onClick={()=>this.props.onItemSelected(id)}>
					{name}
				</li>
			);
		});
	}

	//событие обрабатывающее ошибки
	onError = (err) => {
		this.setState({
		  error: true,
		  loading: false
		});
	}

	render() {

		const { peopleList, loading, error } = this.state;
		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorIndicator/> : null;

		if(!peopleList) {
			return spinner
		}

		const items = this.renderItems(peopleList);
		const content = !(loading || error) ? items : null;
		
		return (
			<ul className="item-list list-group">
				{errorMessage}
				{content}
			</ul>
		);
	}
}