export default class SwapiService {
	_appiBase = 'https://swapi.dev/api'
	async getResource(url) {
		const res = await fetch(`${this._appiBase}${url}`);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url} received ${res.status}`) //проверка если сервер вернул нам ошибку
		}
		return await res.json();
	}
	//Получаем массив персонажей
	async getAllPeople() {
		const res = await this.getResource(`/people/`);
		return res.results;
	}
 //Получаем персонажа по id
	getPerson(id) {
		return this.getResource(`/people/${id}/`)
	}
	//Получаем массив ппланет
	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);
		return res.results;
	}
	//Получаем планету по id
	getPlanet(id) {
		return this.getResource(`/planets/${id}/`);
	}
	//Получаем массив кораблей
	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results;
	}
	//Получаем корабль по id
	getStarsihp(id) {
		return this.getResource(`/starships/${id}/`)
	}
}

const swapi = new SwapiService();

swapi.getStarsihp(5).then(result => console.log(result.name));