import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AbstractComponent from 'ima/page/AbstractComponent';
import { Loader } from 'ima-ui-atoms';

import ForecastDay from 'app/component/forecastDay/ForecastDay';
import ForecastDetail from 'app/component/forecastDetail/ForecastDetail';
import SearchBar from 'app/component/searchBar/SearchBar';

export default class HomeView extends AbstractComponent {

	constructor(props, context) {
		super(props, context);

		this.state = {
			activeDay: 0
		};
	}

	render() {
		return (
			<div className="container">
				{this._renderPlaceAndForecast()}
			</div>
		);
	}

	_renderPlaceAndForecast() {
		const { forecast, location } = this.props;
		const { activeDay } = this.state;

		if (!forecast || !location) {
			return <Loader />;
		}

		return (
			<Fragment>
				<div className="location">
					<h1 className="location__title">{location.title}</h1>
				</div>
				<div className="forecast-days">
					{forecast.daily.map((day, index) => (
						<ForecastDay
							key={index}
							forecast={day}
							place={forecast.place}
							isActive={index === activeDay}
							onClick={event => this.onDayClick(event, index)} />
					))}
				</div>
				{this._renderDetailedForecast()}
			</Fragment>
		);
	}

	_renderDetailedForecast() {
		const { forecastDetail, forecastDetailLoading } = this.props;
		const { activeDay } = this.state;

		if (forecastDetailLoading) {
			return <Loader />;
		}

		return (
			<div className={this.cssClasses('detail')}>
				<h4 className={this.cssClasses('detail__title')}>Detail dne</h4>

				<div className={this.cssClasses('detail__list')}>
					{forecastDetail
						.filter(day => day.dayId === activeDay)
						.map((day, index) => (
							<ForecastDetail
								key={activeDay + index}
								{...day} />
						))
					}
				</div>
			</div>
		)
	}

	onDayClick(event, index) {
		event.preventDefault();

		const { forecast } = this.props;

		if (forecast.daily[index] !== undefined) {
			this.setState({ activeDay: index });
		}
	}
}
