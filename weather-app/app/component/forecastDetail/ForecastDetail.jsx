import { AbstractPureComponent } from '@ima/core';
import React from 'react';
import PropTypes from 'prop-types';

export default class ForecastDetail extends AbstractPureComponent {

	static get propTypes() {
		return {
            dayId: PropTypes.number,
            icon: PropTypes.number,
            isDay: PropTypes.bool,
            localDate: PropTypes.string,
            localTime: PropTypes.string,
            precip: PropTypes.number,
            snowPrecip: PropTypes.number,
            temp: PropTypes.number,
            wind: PropTypes.number,
            windDir: PropTypes.number
		};
	}

	render() {
		const { localDate, localTime } = this.props;
		const date = new Date(`${localDate}T${localTime}`);

		console.log(this.props);

		return (
			<div className = { this.cssClasses('forecast-detail') }>
				<h3 className = { this.cssClasses('forecast-detail__time') }>
					{ `${date.getHours()}:${date.getMinutes()}` }
				</h3>
				<span className = { this.cssClasses({
                    'forecast-detail__prop': true,
                    'forecast-detail__temp': true
                }) }>
					{ Math.round(this.props.temp) } °C
				</span>
				{ this._renderPrecip() }
			</div> 
    	);
	}

	_renderPrecip() {
		const { precip, snowPrecip } = this.props;

		return (
			<span className={this.cssClasses('forecast-detail__precip')}>
				<span className={this.cssClasses('forecast-detail__precip__rain')}>
					<svg version="1.1" viewBox="0 0 311.566 311.566">
						<g>
							<path style={{fill: '#010002' }} d="M136.811,30.497l-3.176,4.716C124.47,48.87,44.054,170.167,44.054,218.775
								c0,51.165,41.609,92.79,92.758,92.79c51.144,0,92.758-41.62,92.758-92.79c0-48.522-80.427-169.895-89.587-183.574L136.811,30.497
								z"/>
						</g>
						<g>
							<g>
								<path style={{fill: '#010002' }} d="M238.071,4.982l-0.963-1.441l-0.979,1.441c-2.817,4.194-27.462,41.359-27.462,56.256
									c0,15.675,12.765,28.425,28.441,28.425c15.665,0,28.43-12.749,28.43-28.425C265.538,46.368,240.888,9.181,238.071,4.982z
									M237.108,87.319c-14.392,0-26.086-11.705-26.086-26.08c0-12.151,18.683-42.055,24.411-50.926l1.675-2.589l1.659,2.589
									c5.733,8.866,24.411,38.77,24.411,50.926C263.177,75.614,251.489,87.319,237.108,87.319z"/>

							</g>
							<g>
								<path style={{fill: '#010002' }} d="M237.108,91.648c-16.774,0-30.426-13.641-30.426-30.41c0-15.164,23.16-50.442,27.805-57.36
									L237.102,0l2.605,3.878c4.645,6.929,27.804,42.267,27.804,57.36C267.518,78.007,253.871,91.648,237.108,91.648z"/>
							</g>
						</g>
					</svg>
					<span>{ precip }%</span>
				</span>

				<span className={this.cssClasses('forecast-detail__precip__snow')}>
					<svg version="1.1" viewBox="0 0 362.734 362.734">
						<polygon points="337.78,230.856 327.939,208.815 285.174,228.974 204.972,181.356 206.899,180.222 285.174,133.761 
							327.939,153.919 337.78,131.879 310.23,118.886 340.048,101.176 328.257,80.179 298.439,97.889 301.273,66.869 277.782,64.601 
							273.383,112.741 195.086,159.225 193.181,160.359 193.181,65.146 231.525,37.142 217.874,17.369 193.181,35.396 193.181,0 
							169.576,0 169.576,35.396 144.86,17.369 131.232,37.142 169.576,65.146 169.576,160.359 167.649,159.225 89.374,112.741 
							84.975,64.601 61.484,66.869 64.318,97.889 34.5,80.179 22.686,101.176 52.527,118.886 24.977,131.879 34.818,153.919 
							77.583,133.761 155.858,180.222 157.785,181.356 77.583,228.974 34.818,208.815 24.977,230.856 52.527,243.848 22.686,261.535 
							34.5,282.555 64.318,264.846 61.484,295.865 84.975,298.11 89.374,249.971 169.576,202.376 169.576,297.589 131.232,325.57 
							144.86,345.365 169.576,327.316 169.576,362.734 193.181,362.734 193.181,327.316 217.874,345.365 231.525,325.57 
							193.181,297.589 193.181,202.376 273.383,249.971 277.782,298.11 301.273,295.865 298.439,264.846 328.257,282.555 
							340.048,261.535 310.23,243.848"/>
					</svg>
					<span>{ snowPrecip }%</span>
				</span>
			</span>
		)
	}
}
