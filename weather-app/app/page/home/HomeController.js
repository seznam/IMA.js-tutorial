import { Router, CookieStorage } from '@ima/core';

import ForecastService from 'app/model/forecast/ForecastService';
import GeoCoderService from 'app/model/geocoder/GeoCoderService';
import AbstractController from 'app/page/AbstractController';
import SearchBarExtension from 'app/component/searchBar/SearchBarExtension';

const DEFAULT_LOCATION_COOKIE = 'dloc';

export default class HomeController extends AbstractController {
  static get $dependencies() {
    return [
      Router,
      CookieStorage,
      ForecastService,
      GeoCoderService,
      SearchBarExtension,
      '$Settings.App.defaultLocation'
    ];
  }

  constructor(
    router,
    cookieStorage,
    forecastService,
    geoCoderService,
    searchBarExtension,
    defaultLocation
  ) {
    super();

    this._router = router;
    this._cookieStorage = cookieStorage;

    this._forecastService = forecastService;
    this._geoCoderService = geoCoderService;

    this._defaultLocation = defaultLocation;

    this.addExtension(searchBarExtension);
  }

  load() {
    let geoCoderPromise = Promise.resolve(this._getDefaultLocation());

    const { location, lat, lon } = this.params;

    if (location) {
      geoCoderPromise = this._geoCoderService.geoCodeMunicipality(
        this.params.location
      );
    } else if (
      !location &&
      (typeof lat !== 'undefined' || typeof lon !== 'undefined')
    ) {
      this._router.redirect(this._router.link('home')); // prevent data-mining
    }

    geoCoderPromise.then(geoLocation => {
      if (
        location &&
        (typeof lat === 'undefined' ||
          typeof lon === 'undefined' ||
          lat !== geoLocation.lat ||
          lon !== geoLocation.lon)
      ) {
        this._router.redirect(
          this._router.link('home', {
            location,
            lat: geoLocation.lat,
            lon: geoLocation.lon
          })
        );
      }

      return geoLocation;
    });

    const forecastPromise = geoCoderPromise.then(location =>
      this._forecastService.getForecast(location.lat, location.lon)
    );

    return {
      location: geoCoderPromise,
      forecast: forecastPromise,

      forecastDetail: null,
      forecastDetailLoading: true
    };
  }

  activate() {
    const { location } = this.getState();

    if (location) {
      this._forecastService
        .getDetailedForecast(location.lat, location.lon)
        .then(forecastDetail =>
          this.setState({ forecastDetail, forecastDetailLoading: false })
        );
    } else {
      this.setState({ forecastDetailLoading: false });
    }
  }

  setMetaParams(loadedResources, metaManager, router) {
    const { location, forecast } = loadedResources;

    if (!location || !forecast) {
      return;
    }

    const todayForecast = forecast.daily[0];
    const locationShortTitle = location.title.split(',')[0];

    const title = `Počasí ${locationShortTitle ||
      location.title} - IMA.js Example`;
    const description = `${todayForecast.localDate}: ${todayForecast.summary}`;

    const url = router.getUrl();

    metaManager.setTitle(title);
    metaManager.setMetaName('description', description);

    metaManager.setMetaName('twitter:title', title);
    metaManager.setMetaName('twitter:description', description);
    metaManager.setMetaName('twitter:card', 'summary');
    metaManager.setMetaName('twitter:url', url);

    metaManager.setMetaProperty('og:title', title);
    metaManager.setMetaProperty('og:description', description);
    metaManager.setMetaProperty('og:type', 'website');
    metaManager.setMetaProperty('og:url', url);
  }

  _getDefaultLocation() {
    if (this._cookieStorage.has(DEFAULT_LOCATION_COOKIE)) {
      const defaultLocation = this._cookieStorage.get(DEFAULT_LOCATION_COOKIE);

      return JSON.parse(defaultLocation);
    }

    return this._defaultLocation;
  }
}
