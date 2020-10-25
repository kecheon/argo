import {Page} from 'argo-ui';
import * as React from 'react';
import './styles.css';

export class Register extends React.Component {
    public handleChange = (event: any) => {};
    public handleSubmit = (event: any) => {};
    public render() {
        return (
            <Page title='Register' toolbar={{breadcrumbs: [{title: 'Register'}]}}>
                <div className='argo-container'>
                    <div className='wrapper'>
                        <div className='form-wrapper'>
                            <form onSubmit={this.handleSubmit} noValidate={true}>
                                <div className='fullName'>
                                    <label htmlFor='fullName'>Full Name</label>
                                    <input type='text' name='fullName' onChange={this.handleChange} />
                                </div>
                                <div className='email'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' name='email' onChange={this.handleChange} />
                                </div>
                                <div className='password'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' name='password' onChange={this.handleChange} />
                                </div>
                                <div className='submit'>
                                    <button>Register Me</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}
