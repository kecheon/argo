import {FormField} from 'argo-ui';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Form, Text} from 'react-form';
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';

import {AppContext} from '../../../shared/context';
import {services} from '../../services';

require('./login.scss');

export interface LoginForm {
    username: string;
    password: string;
}

interface State {
    loginError: string;
    loginInProgress: boolean;
    returnUrl: string;
}

export class Login extends React.Component<RouteComponentProps<{}>, State> {
    public static contextTypes = {
        apis: PropTypes.object
    };

    public static getDerivedStateFromProps(props: RouteComponentProps<{}>): Partial<State> {
        const search = new URLSearchParams(props.history.location.search);
        const returnUrl = search.get('return_url') || '';
        return {returnUrl};
    }

    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {loginError: null, returnUrl: null, loginInProgress: false};
    }

    public render() {
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
                    <Form
                        onSubmit={(params: LoginForm) => this.login(params.username, params.password, this.state.returnUrl)}
                        validateError={(params: LoginForm) => ({
                            username: !params.username && 'Username is required',
                            password: !params.password && 'Password is required'
                        })}>
                        {formApi => (
                            <form role='form' className='width-control' onSubmit={formApi.submitForm}>
                                <div className='argo-form-row'>
                                    <FormField formApi={formApi} label='Username' field='username' component={Text} />
                                </div>
                                <div className='argo-form-row'>
                                    <FormField formApi={formApi} label='Password' field='password' component={Text} componentProps={{type: 'password'}} />
                                    {this.state.loginError && <div className='argo-form-row__error-msg'>{this.state.loginError}</div>}
                                </div>
                                <div className='login__form-row'>
                                    <button disabled={this.state.loginInProgress} className='argo-button argo-button--full-width argo-button--xlg' type='submit'>
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        )}
                    </Form>
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
    }

    private async login(username: string, password: string, returnURL: string) {
        try {
            this.setState({loginError: '', loginInProgress: true});
            this.appContext.apis.navigation.goto('.', {sso_error: null});
            await services.users.login(username, password);
            this.setState({loginInProgress: false});
            if (returnURL) {
                const url = new URL(returnURL);
                this.appContext.apis.navigation.goto(url.pathname + url.search);
            } else {
                this.appContext.apis.navigation.goto('/applications');
            }
        } catch (e) {
            this.setState({loginError: e.response.body.error, loginInProgress: false});
        }
    }

    private get appContext(): AppContext {
        return this.context as AppContext;
    }
}
