import React from 'react';
import { defaultCssClasses } from '@ima/core';
import { shallow } from 'enzyme';
import { withContext } from 'shallow-with-context';
import ForecastDay from '../ForecastDay';

describe('ForecastDay', () => {
    it('can be rendered', () => {
        const props = {
            forecast: {
                localDate: '2019-03-18T08:06:08.341Z',
                tempMin: 5,
                tempMax: 10,
                sunrise: '6:00',
                sunset: '20:00',
                icon: 0
            }
        };
        const context = {
            $Utils: {
                $CssClasses: defaultCssClasses
            }
        };
        const ForecastDayWithContext = withContext(ForecastDay, context);
        const wrapper = shallow(<ForecastDayWithContext {...props} />, { context });

        expect(wrapper).toMatchSnapshot();
    });
});
