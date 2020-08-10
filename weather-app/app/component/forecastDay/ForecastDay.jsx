import { AbstractPureComponent } from '@ima/core';
import React from 'react';
import PropTypes from 'prop-types';

import ForecastIcon from 'app/component/forecastIcon/ForecastIcon';

import PrecipType from 'app/constant/PrecipType';
import ForecastIconType from 'app/constant/ForecastIconType';

export default class ForecastDay extends AbstractPureComponent {
  static get propTypes() {
    return {
      forecast: PropTypes.shape({
        localDate: PropTypes.string,
        bio: PropTypes.number,
        icon: PropTypes.oneOf(Object.values(ForecastIconType)),
        isStorm: PropTypes.bool,
        precip: PropTypes.number,
        precipType: PropTypes.oneOf(Object.values(PrecipType)),
        pressureMax: PropTypes.number,
        pressureMin: PropTypes.number,
        rhMax: PropTypes.number,
        rhMin: PropTypes.number,
        snowPrecip: PropTypes.number,
        summary: PropTypes.string,
        sunrise: PropTypes.string,
        sunset: PropTypes.string,
        tempAvg: PropTypes.number,
        tempMax: PropTypes.number,
        tempMin: PropTypes.number,
        weekday: PropTypes.number,
        wind: PropTypes.number,
        windDir: PropTypes.number
      }).isRequired,
      place: PropTypes.shape({
        TZoffsetFormatted: PropTypes.string
      }),
      isActive: PropTypes.bool,
      onClick: PropTypes.func
    };
  }

  get _forecastTypeCSSClass() {
    return '';
  }

  render() {
    const { forecast, isActive, onClick } = this.props;
    const date = new Date(forecast.localDate);

    return (
      <div
        className={this.cssClasses({
          'forecast-day': true,
          'forecast-day--active': isActive,
          [`forecast-day--${this._forecastTypeCSSClass}`]: true
        })}
        onClick={event => onClick(event)}>
        <h3 className={this.cssClasses('forecast-day__date')}>
          {`${date.getDate()}. ${date.getMonth() + 1}.`}
        </h3>
        <span className={this.cssClasses('forecast-day__temp')}>
          {Math.round(forecast.tempMin)} - {Math.round(forecast.tempMax)} °C
        </span>
        <div className={this.cssClasses('forecast-day__sunrise-sunset')}>
          <span>{forecast.sunrise}</span>&#8212;<span>{forecast.sunset}</span>
        </div>
        <div className={this.cssClasses('forecast-day__icon')}>
          {this._renderIcon()}
        </div>
      </div>
    );
  }

  _renderIcon() {
    const { forecast } = this.props;

    return <ForecastIcon icon={forecast.icon} isDay={true} />;
  }
}
