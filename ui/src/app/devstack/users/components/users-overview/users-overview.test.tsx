import * as React from 'react';
import { render, shallow } from 'enzyme';
import { UsersOverview } from './index';

it('renders without problem', () => {
  const wrapper = shallow(<UsersOverview />);
  expect(wrapper).toMatchSnapshot();
  const text = wrapper.find('div.argo-container').text();
  expect(text).toContain('Manage Users');
})
it('renders without problem', () => {
  const wrapper = render(<UsersOverview />);
  expect(wrapper).toMatchSnapshot();
  const text = wrapper.find('div.argo-container').text();
  expect(text).toContain('Manage Namespaces');
})