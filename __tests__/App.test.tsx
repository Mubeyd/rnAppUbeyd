// /**
//  * @format
//  */

// import React from 'react';
// import 'react-native';
// import App from '../App';

// // Note: import explicitly to use the types shiped with jest.
// import { it } from '@jest/globals';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

import moment from 'moment';
import { WeekendsType } from '../src/features/penaltyCalculatorFormik/db/types';
import { calculateWorkdays } from '../src/features/penaltyCalculatorFormik/helpers/calculateWorkdays';

it('calculates workdays', () => {
  expect(
    calculateWorkdays({
      startDate: moment('2021-01-01'),
      endDate: moment('2021-01-31'),
      weekendsType: WeekendsType.Type1,
      holiDays: ['01/01', '01/02', '01/03', '01/09', '01/10', '01/16', '01/17', '01/23', '01/24', '01/30', '01/31'],
    }),
  ).toBe(20);
});
