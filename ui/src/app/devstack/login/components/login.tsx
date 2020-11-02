import * as React from 'react';
import { useState } from 'react';
import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {uiUrl} from '../../../shared/base';
// import { UserState, UserStateAction, UserStateActionTypes } from '../../classes/current-user';
import withUserState from '../../classes/user-service-consumer';
import {UserService} from '../../services/user-service';

require('./login.scss');

export interface LoginForm {
    username: string;
    password: string;
}

// export interface CurrentUserProps {
//     state: UserState;
//     action: UserStateAction,
//     dispatch: ({type}: { type: string; payload?: any; }) => void;
// }

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();
    const service = new UserService();
    // const [state, action] = userStateReducer(props.state, props.action);
    // function updateUserState(type: string) {
    //     props.dispatch({ type: UserStateActionTypes.LOGGED_IN, payload: {
    //         isLoggedIn: true,
    //         username: 'admin@devstack.co.kr',
    //         permission: {}
    //     } });
    //     props.dispatch({ type: UserStateActionTypes.LOGGED_OUT });
    // }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await service.login(username, password);
        if (result.status === 'success') {
            // update current user and redirect to workflows
            // updateUserState('LOGGED_IN');
            // props.dispatch({ type: 'LOGGED_IN', payload: { isLoggedIn: true, username, permission: {} }});
            setUser(result);
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(result));
            document.location.href = uiUrl('workflows');
        } else {
            alert(`login Error ${username} ${password}`);
        }
    }
    // logout the user
    const handleLogout = () => {
        setUser(null);
        setUsername('');
        setPassword('');
        localStorage.clear();
    };
    if (user) {
        return (
          <div>
            You are already loggged in
            <button onClick={handleLogout}>logout</button>
          </div>
        );
    }
    return (
        <div className='login'>
            <div className='login__content'>
                <div className='login__text'>Let's get stuff orchestrated!</div>
                <div className='argo__logo' />
            </div>
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
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}/>
                        </Form.Group>{' '}
                    </div>
                    <div className='argo-form-row'>
                        <Form.Group controlId='formBasicPassword1'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password'
                            value={ password }
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}/>
                        </Form.Group>
                    </div>
                    <div className='login__form-row'>
                        <button className='argo-button argo-button--base argo-button--full-width argo-button--xlg' type='submit'>
                            Sign In
                        </button>
                    </div>
                    <div className='login__form-row'>
                        <Link to='/register'>
                            <button className='argo-button argo-button--base argo-button--full-width argo-button--xlg' type='button'>
                                Sign Up
                            </button>
                        </Link>
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

export default withUserState(Login);