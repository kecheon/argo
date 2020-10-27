import {Page} from 'argo-ui';
import * as React from 'react';
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from 'react-bootstrap';

export class Register extends React.Component {
    public handleChange = (event: any) => {};
    public handleSubmit = (event: any) => {};
    public render() {
        return (
            <Page title='Register' toolbar={{breadcrumbs: [{title: 'Register'}]}}>
                <div className='argo-container'>
                    <div>
                        <h3>New Tenant</h3>
                        Create user(admin) and namespace for workflow
                    </div>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                    <Button variant='secondary' type='submit'>
                        Cancel
                    </Button>
                    <Form onSubmit={this.handleSubmit}>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group controlId='formBasicUsername'>
                                        <Form.Label>User Name*</Form.Label>
                                        <Form.Control type='text' placeholder='Enter username' />
                                    </Form.Group>
                                    <Form.Group controlId='formBasicDescription'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as='textarea' placeholder='Enter description' />
                                    </Form.Group>
                                    <Form.Group controlId='formBasicEmail'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' placeholder='Enter email' />
                                    </Form.Group>
                                    <Form.Group controlId='formBasicPassword1'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' placeholder='Password' />
                                    </Form.Group>
                                    <Form.Group controlId='formBasicPassword2'>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type='password' placeholder='Password again' />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='formBasicNamespace'>
                                        <Form.Label>Namespace Name*</Form.Label>
                                        <Form.Control type='string' placeholder='Enter namespace' />
                                        <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId='formBasicDescriptionNamespace'>
                                        <Form.Label>Namespace Description</Form.Label>
                                        <Form.Control as='textarea' placeholder='Enter namespace description' />
                                    </Form.Group>
                                    <Form.Label>Quota</Form.Label>
                                    <InputGroup>
                                        <FormControl placeholder='CPU' />
                                        <InputGroup.Append>
                                            <Button variant='outline-secondary'>+</Button>
                                            <Button variant='outline-secondary'>-</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup>
                                        <FormControl placeholder='Memory' />
                                        <InputGroup.Append>
                                            <Button variant='outline-secondary'>+</Button>
                                            <Button variant='outline-secondary'>-</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
            </Page>
        );
    }
}
