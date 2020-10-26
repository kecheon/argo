import {Page} from 'argo-ui';
import * as React from 'react';
import {Button, Form} from 'react-bootstrap';

export class Register extends React.Component {
    public handleChange = (event: any) => {};
    public handleSubmit = (event: any) => {};
    public render() {
        return (
            <Page title='Register' toolbar={{breadcrumbs: [{title: 'Register'}]}}>
                <div className='argo-container'>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>User name</Form.Label>
                            <Form.Control type='text' placeholder='Enter username' />
                        </Form.Group>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' />
                            <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>
                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Submit
                        </Button>
                    </Form>
                </div>
            </Page>
        );
    }
}
