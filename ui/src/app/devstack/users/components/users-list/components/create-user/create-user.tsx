import * as React from 'react';
import {Form} from 'react-bootstrap';
import { useState } from 'react';
import {UserService} from '../../../../../services/user-service';
import {Consumer} from '../../../../../../shared/context';

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
                    <Form.Group controlId='formBasicUsername'>
                        <Form.Label>User Name*</Form.Label>
                        <Form.Control type='text' placeholder='Enter username'
                        value={ username }
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}/>
                    </Form.Group>{' '}
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicDescription'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' placeholder='Description'
                        value={ description }
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Email'
                        value={ email }
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicPassword1'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='password'
                        value={ password }
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicPassword2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='confirm password'
                        value={ password2 }
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword2(e.target.value)}/>
                    </Form.Group>
                </div>
                
                <div className='login__footer'>
                    <a href='https://argoproj.io' target='_blank'>
                        <img className='logo-image' src='assets/images/argologo.svg' alt='argo' />
                    </a>
                </div>
            </form>
        )}
    </Consumer>
  );
}

