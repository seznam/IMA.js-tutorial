export default class ForecastEntryEntity {
    
    constructor(data) {
        this.dayId = data.dayId;
        this.icon = data.icon;
        this.isDay = data.isDay;
        this.localDate = data.localDate;
        this.localTime = data.localTime;
        this.precip = data.precip;
        this.snowPrecip = data.snowPrecip;
        this.temp = data.temp;
        this.wind = data.wind;
        this.windDir = data.windDir;

        Object.freeze(this);
    }
}  