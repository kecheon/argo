import * as React from 'react';
import { useState } from 'react';
import {Form} from 'react-bootstrap';
import {uiUrl} from '../../../shared/base';
import { UserState } from '../../classes/current-user';
import {UserService} from '../../services/user-service';
import axios from 'axios';
import {endpoint} from '../../classes/constants';

require('./login.scss');

const setRole = (roles: string[]) => {
    if (roles.includes('wf-app-admin')) {
        return { name: 'app-admin', level: 0 };
    } else if (roles.includes('wf-tenant-admin')) {
        return { name: 'tenant-admin', level: 1};
    } else if (roles.includes('wf-executor')) {
        return { name: 'executor', level: 2};
    } else if (roles.includes('wf-viewer')) {
        return { name: 'viewer', level: 3};
    } else {
        return { name: 'anonymous', level: 4}
    }
}

export interface LoginForm {
    username: string;
    password: string;
    domainId: string;
}

export default () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const service = new UserService();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const credential = {
            username,
            domainId: 'default',
            password
        }
        const res = await axios.post(`${endpoint}/account/login`, credential);
        if (res.status === 200) {
            const checkLoggedIn = await axios.get(`${endpoint}/account/checkLogin`);
            if (checkLoggedIn.status === 200) {
                // loggedIn ok, then get user info
                const userInfo = await axios.get(`${endpoint}/account/info`);
                if (userInfo.status === 200) {
                    const { name, roles } = userInfo.data;
                    const role = setRole(roles);
                    const currentUser: UserState = {
                        isLoggedIn: true,
                        username: name,
                        role,
                        accessToken: ''
                    }
                    localStorage.setItem('user', JSON.stringify(currentUser));
                    setUser(currentUser);
                    if (currentUser.role.level <= 0) {
                        document.location.href = uiUrl('overview');
                    } else {
                        document.location.href = uiUrl('workflows');
                    }
                }
            } else {
                alert(`login Error ${username} ${password} Try again`);
            }

        } else {
            alert(`login Error ${username} ${password}`);
        }
    }
   
    return (
        <div className='login'>
            <div className='login__box'>
                <form onSubmit={ handleSubmit }>
                    <div className='login__logo width-control'>
                        <img className='logo-image' src='assets/images/devstack/logo.png' alt='devStack' />
                    </div>
                    <div className='argo-form-row'>
                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>User Name*</Form.Label>
                            <Form.Control type='text' placeholder='Enter username'
                                value={ username }
                                name='username'
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}/>
                        </Form.Group>
                    </div>
                    
                    <div className='argo-form-row'>
                        <Form.Group controlId='formBasicPassword1'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password'
                                value={ password }
                                name='password'
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}/>
                        </Form.Group>
                    </div>
                    <div className='login__form-row'>
                        <button className='argo-button argo-button--base argo-button--full-width argo-button--xlg' type='submit'>
                            Sign In
                        </button>
                    </div>
                    <div className='login__form-row'>
                        <button className='argo-button argo-button--base argo-button--full-width argo-button--xlg' 
                            type='button'
                            onClick={() => document.location.href=uiUrl('register')}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};