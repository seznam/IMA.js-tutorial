import XmlParser from 'xml-js';

export default class SuggestResource {
	static get $dependencies() {
		return ['$Http', '$Settings.App.suggest'];
	}

	constructor(http, suggestApiUrl) {
		this._http = http;
		this._api = suggestApiUrl;
	}

	async getItems(phrase) {
		const response = await this._http.get(
			this._api,
			{ phrase, type: 'municipality', limit: 5 },
			this._geoCoderRequestOptions
		);
		
		if (response && response.status === 200 && response.body.result) {
			return response.body.result;
		}

		return [];
	}
}
