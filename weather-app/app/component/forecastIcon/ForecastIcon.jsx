import React from 'react';
import PropTypes from 'prop-types';
import AbstractComponent from 'ima/page/AbstractComponent';

import ForecastIconType from 'app/constant/ForecastIconType';
import Icons from './Icons';

export default class ForecastDay extends AbstractComponent {

	static get propTypes() {
		return {
			icon: PropTypes.oneOf(Object.values(ForecastIconType)),
			isDay: PropTypes.bool,
		};
	}

	render() {
		const { icon, isDay } = this.props;

		let icons = Icons[icon];

		if (!Array.isArray(icons)) {
			icons = [icons];
		}

		return icons.map((iconName, index) => {
			const iconFile = `${this.utils.$Settings.$Static.weatherIcons}/${isDay ? 'day' : 'night'}/${iconName}.svg`;
			
			return <img src = { iconFile } className = {this.cssClasses('forecast-icon')} />;
		});
	}
}
