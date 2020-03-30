import { initImaApp, clearImaApp } from '@ima/plugin-testing-integration';
import ForecastDay from 'app/component/forecastDay/ForecastDay';
import ForecastDetail from 'app/component/forecastDetail/ForecastDetail';

const mockData = {
	daily: [
		{
			dataHours: 21,
			icon: 19,
			localDate: '2020-03-03',
			precip: 23.700000000000003,
			precipType: 1,
			snowPrecip: 0,
			sunrise: '06:39',
			sunset: '17:48',
			tempMax: 6,
			tempMin: 2.3335345453157856,
			wind: 6,
			windDir: 284
		},
		{
			dataHours: 24,
			icon: 1,
			localDate: '2020-03-04',
			precip: 0,
			precipType: 0,
			snowPrecip: 0,
			sunrise: '06:37',
			sunset: '17:50',
			tempMax: 7.720383000000027,
			tempMin: -0.8994912273421392,
			wind: 5.3,
			windDir: 252
		}
	],
	entries: [
		{
			dayId: 0,
			icon: 19,
			isDay: true,
			localDate: '2020-03-03',
			localTime: '07:00',
			precip: 0.5,
			snowPrecip: 0,
			temp: 6,
			wind: 2.9,
			windDir: 236
		},
		{
			dayId: 0,
			icon: 27,
			isDay: true,
			localDate: '2020-03-03',
			localTime: '16:00',
			precip: 1.6,
			snowPrecip: 0,
			temp: 4.906368817973657,
			wind: 6,
			windDir: 284
		},
		{
			dayId: 1,
			icon: 34,
			isDay: true,
			localDate: '2020-03-04',
			localTime: '07:00',
			precip: 0,
			snowPrecip: 0,
			temp: -0.8994912273421392,
			wind: 3.9,
			windDir: 240
		},
		{
			dayId: 1,
			icon: 26,
			isDay: true,
			localDate: '2020-03-04',
			localTime: '16:00',
			precip: 0,
			snowPrecip: 0,
			temp: 6.889491726579081,
			wind: 4.4,
			windDir: 245
		}
	],
	place: {
		TZoffset: 1,
		isDay: false,
		lat: 50.0720383,
		localNow: '2020-03-03T18:17:05+01:00',
		lon: 14.4395213
	}
};

describe('Integration tests', () => {
	let app;

	beforeAll(async () => {
		app = await initImaApp({
			initBindApp: (ns, oc) => {
				// Mockneme si http.get metodu tak, aby nam
				// vracela vzdy nas mocknuty response z api
				oc.get('$Http').get = jest.fn((_, params) => {
					const body = {};

					params.include.forEach(key => (body[key] = mockData[key]));

					return Promise.resolve({ body });
				});
			}
		});

		// Nacteme si domovskou stranku tak,
		// ze vyuzijeme Object Container (oc)
		// k ziskani aktualni instance routeru
		// a ten pak pouzijeme k navigaci
		await app.oc.get('$Router').route('/');
	});

	afterAll(() => {
		clearImaApp(app);
	});

	it('can load homepage', () => {
		// Zkontrolujeme, ze jsme na spravne strance
		expect(document.title).toEqual('Počasí Praha - IMA.js Example');

		// Zkontrolujeme provolani http.get metody
		expect(app.oc.get('$Http').get).toHaveBeenCalledTimes(2);
		// Zkontrolujeme parametr include prvniho volani
		expect(app.oc.get('$Http').get.mock.calls[0][1].include).toEqual(['place', 'daily']);
		// Zkontrolujeme parametr include druheho volani
		expect(app.oc.get('$Http').get.mock.calls[1][1].include).toEqual(['entries']);

		// Zkontrolujeme, ze mame vykreslenou komponentu ForecastDay
		expect(document.querySelectorAll('.forecast-day').length).toEqual(2);
		// Zkontrolujeme, ze mame vykreslenou komponentu ForecastDetail
		expect(document.querySelectorAll('.forecast-detail').length).toEqual(2);
		
		// Zkontrolujeme, ze aktivni je defaultne hned prvni den
		expect(app.wrapper().find(ForecastDay).get(0).props.isActive).toEqual(true);
		// a druhy den je neaktivni
		expect(app.wrapper().find(ForecastDay).get(1).props.isActive).toEqual(false);
		// a mame zobrazeny detail prvniho dne
		expect(app.wrapper().find(ForecastDetail).get(0).props.dayId).toEqual(0);
	});

	it('can switch forecast day', () => {
		// Preklikneme na predpoved druheho dne
		app.wrapper().find(ForecastDay).at(1).simulate('click');

		// Zkontrolujeme, ze puvodni den uz neni aktivni
		expect(app.wrapper().find(ForecastDay).get(0).props.isActive).toEqual(false);
		// a nami nakliknuty den se aktivnim stal
		expect(app.wrapper().find(ForecastDay).get(1).props.isActive).toEqual(true);
		// a vykreslila se predpoved pro nove zvoleny den
		expect(app.wrapper().find(ForecastDetail).get(0).props.dayId).toEqual(1);
	});
});
