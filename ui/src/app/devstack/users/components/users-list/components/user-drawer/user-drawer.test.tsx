import * as React from 'react';
import { shallow } from 'enzyme';
import { WorkflowDrawer } from './user-drawer';
// import fetchMock from 'fetch-mock';
import {UserService} from '../../../../../services/user-service';

const userService = new UserService;

describe('User profile', () => {
  it('shows the loading component and then the data once it has been fetched', async () => {
    const { name, id, domain_id } = await userService.getUserProfile('link');
    const wrapper = shallow(<WorkflowDrawer name={name} id={id} domain_id={domain_id} />);
    expect(wrapper.find('Loading')).toBeTruthy();
  })
})