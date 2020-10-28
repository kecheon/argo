import * as React from 'react';
import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

require('./login.scss');

export interface LoginForm {
    username: string;
    password: string;
}

// interface State {
//     username: string;
//     password: string;
//     loginError: string;
//     loginInProgress: boolean;
//     returnUrl: string;
// }

export const Login = () => {
    return (
        <div className='login'>
            <div className='login__content'>
                <div className='login__text'>Let's get stuff orchestrated!</div>
                <div className='argo__logo' />
            </div>
            <div className='login__box'>
                <div className='login__logo width-control'>
                    <img className='logo-image' src='assets/images/devstack/logo.png' alt='devStack' />
                </div>
                <form role='form' className='width-control'>
                    <div className='argo-form-row'>
                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>User Name*</Form.Label>
                            <Form.Control type='text' placeholder='Enter username' />
                        </Form.Group>{' '}
                    </div>
                    <div className='argo-form-row'>
                        <Form.Group controlId='formBasicPassword1'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' />
                        </Form.Group>
                    </div>
                    <div className='login__form-row'>
                        <button className='argo-button argo-button--full-width argo-button--xlg' type='submit'>
                            Sign In
                        </button>
                    </div>
                </form>
                <div className='login__form-row'>
                    <Link to='/register'>
                        <button className='argo-button argo-button--full-width argo-button--xlg' type='button'>
                            Sign Up
                        </button>
                    </Link>
                </div>
                <div className='login__footer'>
                    <a href='https://argoproj.io' target='_blank'>
                        <img className='logo-image' src='assets/images/argologo.svg' alt='argo' />
                    </a>
                </div>
            </div>
        </div>
    );
};
