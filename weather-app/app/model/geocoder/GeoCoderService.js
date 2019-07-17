import GeoCoderResource from './GeoCoderResource';
import GeoCoderFactory from './GeoCoderFactory';

export default class GeoCoderService {
    static get $dependencies() {
        return [GeoCoderResource, GeoCoderFactory];
    }

    constructor(resource, factory) {
        this._resource = resource;
        this._factory = factory;
    }

    async geoCode(phrase) {
        const results = await this._resource.getItems(phrase);

        return this._factory.createEntityList(results);
    }

    async geoCodeMunicipality(phrase) {
        const results = await this._resource.getItems(phrase);

        const municipality = results.filter(result => result.type === 'muni')[0];

        if (!municipality) {
            return null;
        }

        return this._factory.createEntity(municipality);
    }
}
