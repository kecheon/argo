import * as React from 'react';
import { useState } from 'react';
import {Form} from 'react-bootstrap';
import {uiUrl} from '../../../shared/base';
import { UserState } from '../../classes/current-user';
// import { UserState, UserStateAction, UserStateActionTypes } from '../../classes/current-user';
// import withUserState from '../../classes/user-service-consumer';
import {UserService} from '../../services/user-service';
import axios from 'axios';

require('./login.scss');

export interface LoginForm {
    username: string;
    password: string;
}

export default () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const service = new UserService();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const endpoint = 'http://localhost:3000';
        const credential = {
            username,
            domainId: 'default',
            password
        }
        await axios.post(`${endpoint}/account/login`, credential);
        document.location.href = uiUrl('workflows');

        // const result = await service.login(username, password);
        // if (result.status === 'success') {
        //     // update current user and redirect to workflows
        //     console.log(user);
        //     // store the user in localStorage
        const currentUser: UserState = {
            isLoggedIn: true,
            username: 'admin',
            role: {name: 'wf-admin', level: 0},
            accessToken: 'jwtToken_if_exists'
        }
        localStorage.setItem('user', JSON.stringify(currentUser));
        localStorage.setItem('accessToken', currentUser.accessToken);
        setUser(currentUser);
        if (currentUser.role.level <= 0) {
            document.location.href = uiUrl('overview');
        } else {
            document.location.href = uiUrl('workflows');
        }
        // } else {
        //     alert(`login Error ${username} ${password}`);
        // }
    }
    // logout the user
    // const handleLogout = () => {
    //     setUser(null);
    //     setUsername('');
    //     setPassword('');
    //     localStorage.clear();
    // };

    // if (user) {
    //     return (
    //       <div>
    //         You are already loggged in
    //         <button onClick={handleLogout}>logout</button>
    //       </div>
    //     );
    // }
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
                    <div className='login__footer'>
                        <a href='https://argoproj.io' target='_blank'>
                            <img className='logo-image' src='assets/images/argologo.svg' alt='argo' />
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

// export default withUserState(Login);