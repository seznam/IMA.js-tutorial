import XmlParser from 'xml-js';

export default class GeoCoderResource {
	static get $dependencies() {
		return ['$Http', '$Settings.App.geocoder'];
	}

	constructor(http, geoCoderUrl) {
		this._http = http;

		this._api = geoCoderUrl;

		this._geoCoderRequestOptions = {
			headers: {
				"Accept": "text/xml,application/xhtml+xml,application/xml",
			}
		};
	}

	async getItems(query) {
		const response = await this._http.get(this._api, { query }, this._geoCoderRequestOptions);
		const { result } = XmlParser.xml2js(response.body, { compact: true });
		
		if (result && result.point && +result.point._attributes.status === 200) {
			return result.point.item.map(item => item._attributes);
		}

		return [];
	}
}
