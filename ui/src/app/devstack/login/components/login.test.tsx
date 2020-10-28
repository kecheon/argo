import {shallow} from 'enzyme';
import * as React from 'react';
import {Login} from './login';

test('renders the component', () => {
    const component = shallow(<Login />);
    expect(component).toMatchSnapshot();
});
