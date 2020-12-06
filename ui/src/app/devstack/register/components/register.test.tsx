import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import * as React from 'react';
import {Register} from './register';

xdescribe('Registration component', () => {
    it('should render', () => {
        const {container} = render(<Register />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
