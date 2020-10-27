import {FormField, FormSelect, Page} from 'argo-ui';
import * as React from 'react';
import {Form, Text} from 'react-form';

interface State {
    signUpProgress: boolean;
}

export class Register extends React.Component<State> {
    // constructor(props: {}) {
    //     super(props);
    //     this.state = {signUpProgress: false};
    // };
    // public state: State = {
    //     signUpProgress: false
    // };
    // public handleChange = (event: any) => {};
    // public handleSubmit = (event: any) => {};
    public render() {
        return (
            <Page title='Register' toolbar={{breadcrumbs: [{title: 'Register'}]}}>
                <div className='argo-container'>
                    <Form>
                        {(api) => (
                            <form style={{padding: '1em'}}>
                                <div className='argo-form-row'>
                                    <FormField label='Username' formApi={api} field='textField' component={Text} />
                                </div>
                                <div className='argo-form-row'>
                                    <FormField label='Email' formApi={api} field='textField' component={Text} />
                                </div>
                                <div className='argo-form-row'>
                                    <FormField label='Password' formApi={api} field='passwordField' component={Text} componentProps={{type: 'password'}} />
                                </div>
                                <div className='argo-form-row'>
                                    <FormField label='Select' formApi={api}  field='selectField' component={FormSelect} componentProps={{options: ['option1', 'option2']}} />
                                </div>
                                <div className='argo-form-row'>
                                    <button className='argo-button argo-button--full-width argo-button--xlg' type='submit'>
                                        Register me
                                    </button>
                                </div>
                            </form>
                        )}
                    </Form>
                </div>
            </Page>
        );
    }
}
