import ForecastResource from './ForecastResource';
import ForecastFactory from './ForecastFactory';

export default class ForecastService {
    static get $dependencies() {
        return [ForecastResource, ForecastFactory];
    }

    constructor(resource, factory) {
        this._resource = resource;
        this._factory = factory;
    }

    async getForecast(lat, lon) {
        const result = await this._resource.getForecast(lat, lon);

        return this._factory.createEntity(result);
    }

    async getDetailedForecast(lat, lon) {
        const result = await this._resource.getDetailedForecast(lat, lon);

        return this._factory.createForecastEntryEntities(result);
    }
}
