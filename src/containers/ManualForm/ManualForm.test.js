import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ManualForm } from './ManualForm';
import CarForm from './CarForm/CarForm';

configure({ adapter: new Adapter() });

describe('<ManualForm />', () => {
 let wrapper;

 beforeEach(() => {
  wrapper = shallow(<ManualForm getVehicles={() => {}}/>);
 });

 it('should render <CarForm>', () => {
  expect(wrapper.find(CarForm)).toHaveLength(1);
 });
});