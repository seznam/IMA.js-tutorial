export default class ForecastEntity {
    
    constructor(data) {
        this.place = data.place;

        this.daily = data.daily;

        Object.freeze(this);
    }
}  