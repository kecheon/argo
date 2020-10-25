import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import * as React from 'react';
import {Register} from './register';

describe('Registeration component', () => {
  it('should render', () => {
    const {container} = render(<Register />);
    expect(container.firstChild).toMatchSnapshot();
  })
})
