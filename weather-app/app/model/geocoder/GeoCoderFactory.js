import GeoCoderEntity from './GeoCoderEntity';

export default class GeoCoderFactory {

    static get $dependencies() {
        return [];
    }

    createEntity(data) {
        return new GeoCoderEntity(data);
    }

    createEntityList(data) {
        return data.map(entityData => this.createEntity(entityData));
    }
}
