export default class GeoCoderEntity {
    
    constructor(data) {
        this.id = data.id;

        this.title = data.title;

        this.lat = data.y;

        this.lon = data.x;

        this.type = data.type;

        Object.freeze(this);
    }
}  