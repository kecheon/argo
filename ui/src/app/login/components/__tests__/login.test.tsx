import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import * as React from 'react';
import {Login} from '../login';

describe('<Login /> tests', () => {
    it('should render without crash', () => {
        const {container} = render(<Login />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
