export default class SwapiService {
	_appiBase = 'https://swapi.dev/api'
	async getResource(url) {
		const res = await fetch(`${this._appiBase}${url}`);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url} received ${res.status}`) //проверка если сервер вернул нам ошибку
		}
		return await res.json();
	}

	// функция для получения id
	_extractId(item) {
		const idRegExp = /\/([0-9]*)\/$/; //регулярное выражение, которое позволяет вытащить с url ("url": "https://swapi.dev/api/planets/12/") id, так как в API id отсутствует
		return item.url.match(idRegExp)[1]; //извлекаем id с url
	}

	//Получаем массив персонажей
	async getAllPeople() {
		const res = await this.getResource(`/people/`);//получаем данные с API
		return res.results.map(this._transformPerson); //возвращаем массив
	}
 //Получаем персонажа по id
	async getPerson(id) {
		const person = await this.getResource(`/people/${id}/`);//получаем данные с API
		return this._transformPerson(person); //возвращаем объект
	}
	// функция переобразующая данные по персонажам
	_transformPerson(person) {
		return {
			id: this._extractId(person),
			name: person.name,
			gender: person.gender,
			birthYear: person.birth_year,
			eyeColor: person.eye_color
		}
	}


	//Получаем массив ппланет
	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);//получаем данные с API
		return res.results.map(this._transformPlanet);//возвращаем массив
	}
	//Получаем планету по id
	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}/`);//получаем данные с API
		return this._transformPlanet(planet); //возвращаем объект
	}
	// функция переобразующая данные по планете
	_transformPlanet(planet) {
		return {
			id: this._extractId(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period,
			diameter: planet.diameter
		}
	}


	//Получаем массив кораблей
	async getAllStarships() {
		const res = await this.getResource(`/starships/`);//получаем данные с API
		return res.results.map(this._transformStarship);//возвращаем массив
	}
	//Получаем корабль по id
	async getStarsihp(id) {
		const starship = await this.getResource(`/starships/${id}/`); //получаем данные с API
		return this._transformStarship(starship) //возвращаем объект
	}
	// функция переобразующая данные по кораблям
	_transformStarship(starship) {
		return {
			id: this._extractId(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.cost_in_credits,
			passengers: starship.passengers,
			consumables: starship.consumables,
			length: starship.length,
			crew: starship.crew,
			cargoCapacity: starship.cargo_capacity,
		}
	}

}

// const swapi= new SwapiService();

// swapi.getAllPeople().then((body) => {
// 	body.forEach(element => {
// 		console.log(element.name)
// 	});
// })