import '@testing-library/jest-dom/extend-expect';
// import {render} from '@testing-library/react';
import {shallow} from 'enzyme';
import * as React from 'react';
// import {BrowserRouter as Router} from 'react-router-dom';
import Login from './login';

describe('Login component', () => {
    test('renders the component', () => {
        const component = shallow(<Login />);
        expect(component).toMatchSnapshot();
    });
});
