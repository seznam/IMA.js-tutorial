import ForecastEntity from './ForecastEntity';
import ForecastEntryEntity from './ForecastEntryEntity';

export default class ForecastFactory {

    static get $dependencies() {
        return [];
    }

    createEntity(data) {
        return new ForecastEntity(data);
    }

    createForecastEntryEntities(data) {
        return data.map(entryData => new ForecastEntryEntity(entryData));
    }
}
