import SuggestEntity from './SuggestEntity';

export default class SuggestFactory {

    static get $dependencies() {
        return [];
    }

    createEntity(data) {
        return new SuggestEntity(data.userData);
    }

    createEntityList(data) {
        return data.map(entityData => this.createEntity(entityData));
    }
}
