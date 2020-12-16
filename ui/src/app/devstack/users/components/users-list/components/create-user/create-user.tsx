import * as React from 'react';
import {Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {UserService} from '../../../../../services/user-service';
import {NamespaceService} from '../../../../../services/namespace-service';
import {RolesService} from '../../../../../services/roles-service';
import {Consumer} from '../../../../../../shared/context';
import { Select } from 'argo-ui';
import { Row, Col } from 'react-bootstrap';
// import { User } from '../../../../components/models';

interface UserForm {
  name: string;
  email?: string;
  password: string;
  description?: string;
  default_project_id: string;
  role: string;
  enabled?: boolean;
}

export default () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [roleName, setRoleName] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [options, setOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  // const [user, setUser] = useState();
  const service = new UserService();
  const nsService = new NamespaceService();
  const roleService = new RolesService();
  useEffect(() => {
      nsService.get().then(ns => {
        setOptions(ns.namespaces.map((item: any) => { 
            return {title: item.name, value: item.id };
        }));
      })
      roleService.get().then(r => {
        setRoleOptions(r.roles.map((item: {name: string;}) => item.name));
      })
  }, [])
  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const newUser: UserForm = {
          name,
          email,
          password,
          description,
          default_project_id: project,
          role: roleName,
          enabled
      }
      console.log(newUser);
      const result = await service.register(newUser);
      if (result.status === 'success') {
          // post new user to backend
      } else {
          alert(`User Create Error ${name} ${password}`);
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
                                value={ name }
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}/>
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
                    <Form.Group as={Row} controlId='formBasicEnabled'>
                        <Form.Label column={true} sm={2}>Primary Project</Form.Label>
                        <Col sm={4}>
                            <Select options={options}
                                value={project}
                                onChange={(option) => setProject(option.value)}
                                placeholder='Select Service'
                            />
                        </Col>
                        <Form.Label column={true} sm={2}>Role</Form.Label>
                        <Col sm={4}>
                            <Select options= {roleOptions}
                                value={roleName}
                                onChange={(option) => setRoleName(option.value)}
                                placeholder='Select Role'
                            />
                        </Col>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicEnabled'>
                        <Form.Label column={true} sm={2}>Enabled</Form.Label>
                        <Col sm={2}>
                            <Form.Check inline={true} type={'checkbox'}
                                defaultChecked={enabled}
                                value={enabled}
                                onChange={(e: { target: { value: React.SetStateAction<boolean>, checked: any }; }) => 
                                    {
                                        setEnabled(e.target.checked)
                                    }
                                }/>
                        </Col>
                    </Form.Group>
                </div>
            </form>
        )}
    </Consumer>
  );
}

