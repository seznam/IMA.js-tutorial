import HttpAgent from 'ima/http/HttpAgent';

export default class ForecastResource {
	static get $dependencies() {
		return [HttpAgent, '$Settings.App.api'];
	}

	constructor(http, apiUrl) {
		this._http = http;
		this._api = apiUrl;
	}

	async getForecast(lat, lon) {
		const response = await this._http.get(this._api, { lat, lon, include: ['place', 'daily'] });
		
		return response.body;
	}

	async getDetailedForecast(lat, lon) {
		const response = await this._http.get(this._api, { lat, lon, include: ['entries'] });
				
		return response.body.entries;
	}
}
