/*
 // current testing env is node on jest.config so that need to set this test's env to jsdom
 * @jest-environment jsdom
*/
import axios from 'axios';

import '@testing-library/jest-dom/extend-expect';
// import {render} from '@testing-library/react';
import {mount} from 'enzyme';
import * as React from 'react';
// import {BrowserRouter as Router} from 'react-router-dom';
import Login from './login';
import {UserService} from '../../services/user-service';

const nextTick = async () => {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    })
}

describe('Login component', () => {
    test('renders the component', () => {
        const component = mount(<Login />);
        expect(component).toMatchSnapshot();
    });
    test('enter login credentials and redirect to workflows url', async () => {
        const wrapper = mount(<Login />);
        const input1 = wrapper.find('input[name="username"]');
        input1.simulate('change', {
            target: {
                value: 'admin@devstack.co.kr'
            }
        });
        expect(wrapper.find('input[name="username"]').prop('value')).toEqual('admin@devstack.co.kr');
        const input2 = wrapper.find('input[name="password"]');
        input2.simulate('change', {
            target: {
                value: 'devstack'
            }
        });
        expect(wrapper.find('input[name="password"]').prop('value')).toEqual('devstack');

    });
    xtest('mock userService login', async () => {
        /* 
            You can't test handleSubmit function directly. The nature of the JavaScript language means that you can never access things hidden inside a closure.
            In this case, you can test it by shallow rendering Login, and asserting on the non-button children of the div it renders.
        */
        const service = new UserService();
        const mock = jest.spyOn(service, 'login');
        const wrapper = mount(<Login />);
        const submitBtn = wrapper.find('button[type="submit"]');
        expect(submitBtn.length === 1).toBeTruthy();
        submitBtn.simulate('click');
        await nextTick();
        expect(mock).toHaveBeenCalled();
    });
});


describe('Login api of Gateway', () => {
    const endpoint = 'http://localhost:3000';
    test('responses something precious', async () => {
        const credential = {
            username: 'admin',
            domainId: 'default',
            password: 'devstack'
        }
        const res = await axios.post(`${endpoint}/account/login`, credential);
        expect(res.status).toEqual(200);
        console.log(res);

    })
})