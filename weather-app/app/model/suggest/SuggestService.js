import SuggestResource from './SuggestResource';
import SuggestFactory from './SuggestFactory';

export default class SuggestService {
    static get $dependencies() {
        return [SuggestResource, SuggestFactory];
    }

    constructor(resource, factory) {
        this._resource = resource;
        this._factory = factory;
    }

    async getList(phrase) {
        const results = await this._resource.getItems(phrase);

        return this._factory.createEntityList(results);
    }
}
