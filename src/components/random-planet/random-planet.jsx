import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner/spinner';

import './random-planet.css';

export default class RandomPlanet extends Component {

	swapiService = new SwapiService(); //инициализируем наш API клиент

	state = {
		planet: {}, //начальное состояния объекта планеты (пустое)
		loading: true,
	};

	constructor() {
		super();
		this.updatePlanet();
	}
	 //событие в котором заменяем пустой объкт из стейта на полученный через swapi-service(id,name,population,diametr,rotation period) и отключается loader
	onPlanetLoaded = planet => this.setState({
		planet, 
		loading: false,
		error: false
	});

	//событие обрабатывающее ошибки
	onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

	updatePlanet() {
		const id = Math.floor(Math.random()*25)+2; //случайным образом получаем id(от 2 до 27) планеты 
		this.swapiService.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	}

	render() {
		
		const {planet, loading, error } = this.state;
	
		const hasData = !(loading || error);
		const errorMessage = error ? <ErrorIndicator/> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <PlanetView planet={planet} /> : null;

		return (
			<div className="random-planet jumbotron rounded">
				{errorMessage}
				{spinner}
        {content}
      </div>
		);
	}
}

const PlanetView = ({planet}) => {
	const {id, name, population, rotationPeriod, diameter} = planet;
	return (
		<React.Fragment>
			<img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="Картинка планеты"/>
			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population</span>
						<span>{population}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation Period</span>
						<span>{rotationPeriod}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter</span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	)
}