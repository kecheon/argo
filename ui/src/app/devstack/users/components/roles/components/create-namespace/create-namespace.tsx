import * as React from 'react';
import {Form} from 'react-bootstrap';
import { useState } from 'react';
import { NamespaceService } from '../../../../../services/namespace-service';
import {Consumer} from '../../../../../../shared/context';

export interface NamespaceForm {
  name: string;
  member?: {
      userId: string;
      role: string;
  };
  quota?: {
      cpu: number,
      memory: number
  },
  enabled?: boolean;
} 

export default () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  // const [user, setUser] = useState();
  const service = new NamespaceService();
  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const newNamespace: NamespaceForm = {
          name,
          member: {
              userId,
              role
          },
          enabled,
      }
      const result = await service.create(newNamespace);
      if (result.status === 'success') {
          // post new user to backend
      } else {
          alert(`Namespace create Error ${name}`);
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
                    <Form.Group controlId='formBasicName'>
                        <Form.Label>Name*</Form.Label>
                        <Form.Control type='text' placeholder='Enter namespace name'
                        value={ name }
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicUserId'>
                        <Form.Label>Member</Form.Label>
                        <Form.Control type='text' placeholder='User id'
                        value={ userId }
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserId(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicRole'>
                        <Form.Label>Role</Form.Label>
                        <Form.Control type='text' placeholder='Role'
                        value={ role }
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setRole(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicCpu'>
                        <Form.Label>CPU</Form.Label>
                        <Form.Control type='number' placeholder='CPU'
                        value={ cpu }
                        onChange={(e: { target: { value: React.SetStateAction<number>; }; }) => setCpu(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicMemory'>
                        <Form.Label>Memory</Form.Label>
                        <Form.Control type='number' placeholder='memory size'
                        value={ memory }
                        onChange={(e: { target: { value: React.SetStateAction<number>; }; }) => setMemory(e.target.value)}/>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group controlId='formBasicEnabled'>
                        <Form.Label>Enabled</Form.Label>
                        <Form.Control type='boolean' placeholder='Enabled'
                        value={ enabled }
                        onChange={(e: { target: { value: React.SetStateAction<boolean>; }; }) => setEnabled(e.target.value)}/>
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