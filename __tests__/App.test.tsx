/// UNIT TESTS
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

/// UI TESTS
import axios from 'axios';
import React from 'react';
import { act, create } from 'react-test-renderer';
import TestScreen from '../src/features/home/screens/TestScreen';

const tree = create(<TestScreen />);

// jest.runAllTimers();

test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});

// test('call timeout', () => {
//   act(() => jest.runAllTimers());
//   const text = tree.root.findByProps({ testID: 'myText' }).props;
//   expect(text.children).toEqual('timeout is called');
// });

test('button press', () => {
  const instance = tree.root;
  const button = instance.findByProps({ testID: 'myButton' }).props;
  act(() => button.onPress());

  const text = instance.findByProps({ testID: 'myText' }).props;
  expect(text.children).toEqual('Hello world');
});

/// Axios dummy users api test
test('request', async () => {
  const response = await axios.get('https://dummyjson.com/users');
  expect(response.status).toEqual(200);
  expect(response.data.users).toHaveLength(30);
});
