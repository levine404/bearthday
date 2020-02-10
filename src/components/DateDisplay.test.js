import React from 'react';
import { shallow } from 'enzyme';
import DateDisplay from './DateDisplay';

describe('DateDisplay', () => {
  it('renders', () => {
    const D = new Date('2016-1-3');
    const wrapper = shallow(<DateDisplay label="test" date={D} changeDate={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });
});