import * as React from 'react';
import {Form} from 'react-bootstrap';
import { useState } from 'react';
import {UserService} from '../../../../../services/user-service';
import {Consumer} from '../../../../../../shared/context';
import { Select } from 'argo-ui';
import { Row, Col } from 'react-bootstrap';

interface UserForm {
  username: string;
  email: string;
  password: string;
}


export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [roleName, setRoleName] = useState('');
  const [enabled, setEnabled] = useState(false);
  // const [user, setUser] = useState();
  const service = new UserService();
  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const newUser:UserForm = {
          username,
          email,
          password,
      }
      const result = await service.register(newUser);
      if (result.status === 'success') {
          // post new user to backend
      } else {
          alert(`login Error ${username} ${password}`);
      }
  }
  return (
    <Consumer>
        {ctx => (
            <form onSubmit={ handleSubmit }>
                <div className='login__form-row'>
                    <button className='argo-button argo-button--base' type='submit'>
                        <i className='fa fa-plus-circle' /> Submit
                    </button>
                    <button className='argo-button argo-button--base' type='button' onClick={() => ctx.navigation.goto('.', {new: null})}>
                        <i className='fa fa-times-circle' /> Cancel
                    </button>
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicUsername'>
                        <Form.Label column={true} sm={2}>User Name*</Form.Label>
                        <Col sm={10}>
                            <Form.Control type='text' placeholder='Enter username'
                                value={ username }
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicDescription'>
                        <Form.Label column={true} sm={2}>Description</Form.Label>
                        <Col sm={10}>
                            <Form.Control as='textarea' placeholder='Description'
                                value={ description }
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicEmail'>
                        <Form.Label column={true} sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type='email' placeholder='Email'
                                value={ email }
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicPassword1'>
                        <Form.Label column={true} sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type='password' placeholder='password'
                                value={ password }
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicPassword2'>
                        <Form.Label column={true} sm={2}>Confirm Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type='password' placeholder='confirm password'
                                value={ password2 }
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword2(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Select options={ [{ title: 'service1', value: 'service1'}, { title: 'service2', value: 'service2'}, { title: 'service3', value: 'service3'}, ] }
                        value={project}
                        onChange={(option) => setProject(option.value)}
                        placeholder='Select Service'
                    />
                </div>
                <div className='argo-form-row'>
                    <Select options= { [
                        {title: 'admin', value: 'admin'},
                        {title: 'tenant_admin', value: 'tenant_admin'},
                        {title: 'executor', value: 'executor'},
                        {title: 'viewer', value: 'viewer'}] }
                        value={roleName}
                        onChange={(option) => setRoleName(option.value)}
                        placeholder='Select Role'
                    />
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicEnabled'>
                        <Form.Label column={true} sm={2}>Enabled</Form.Label>
                        <Col sm={2}>
                            <Form.Check inline={true} type={'checkbox'}
                                onChange={(e: { target: { value: React.SetStateAction<boolean>; }; }) => setEnabled(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </div>
            </form>
        )}
    </Consumer>
  );
}

