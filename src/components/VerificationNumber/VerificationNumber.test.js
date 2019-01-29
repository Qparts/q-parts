import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VerificationNumber from './VerificationNumber';

configure({ adapter: new Adapter() });

describe('<VerificationNumber />', () => {
 let props;
 let wrapper;
 let form;

 beforeEach(() => {
  props = {
   handleSubmit: jest.fn(() => fn),
   renderField: jest.fn(() => fn)
  }
  wrapper = shallow(<VerificationNumber {...props} />)
  form = wrapper.find('form').first();
 });

 it('should render a <form />', () => {
  expect(form).toHaveLength(1);
 });

 it('should call handle sumbit when save form', () => {
 });
});