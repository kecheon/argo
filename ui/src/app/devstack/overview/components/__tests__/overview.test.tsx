import '@testing-library/jest-dom/extend-expect';
// import {render} from '@testing-library/react';
import {shallow} from 'enzyme';
import * as React from 'react';
import Overview from '../overview';

describe('Overview component', () => {
    it('renders the component', () => {
        const component = shallow(<Overview />);
        expect(component).toMatchSnapshot();
    });
});