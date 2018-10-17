import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Link } from 'react-router-dom';
import Layout from './Layout';

configure({adapter: new Adapter()});

describe('<Layout />', () => {
 let wrapper;

 beforeEach(() => {
  wrapper = shallow(<Layout />);
 });

 it('should render two <Link /> items', () => {
  expect(wrapper.find(Link)).toHaveLength(2);
 });

 it('should render one <Link /> with prop ', () => {
  expect(wrapper.contains(<Link className="setting" to="/cart"><i className="fas fa-shopping-cart fa-2x"></i></Link>)).toEqual(true)
 });
});