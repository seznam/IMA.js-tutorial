export default class SuggestEntity {
    
    constructor(data) {
        this.id = data.id;

        this.title = data.suggestFirstRow;

        this.district = data.suggestSecondRow;

        this.lat = data.latitude;

        this.lon = data.longitude;

        Object.freeze(this);
    }
}  