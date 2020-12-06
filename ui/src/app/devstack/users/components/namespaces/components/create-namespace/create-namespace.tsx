import * as React from 'react';
import {Col, Form} from 'react-bootstrap';
import { useState } from 'react';
import { NamespaceService } from '../../../../../services/namespace-service';
import {Consumer} from '../../../../../../shared/context';
import { Select } from 'argo-ui/src/components';
import { Row } from 'react-bootstrap';

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
  const [description, setDescription] = useState('');
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
  const options: any = [
      {title: 'swift', value: 'admin'},
      {title: 'glance', value: 'executor'},
      {title: 'ydcho', value: 'viewer'},
  ];
  const options2: any = [
    {title: 'testuser', value: 'admin'},
    {title: 'example2', value: 'viewer'}
  ];
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
                    <Form.Group as={Row} controlId='formBasicName'>
                        <Form.Label column={true} sm={2}>Name*</Form.Label>
                        <Col sm={10}>
                            <Form.Control type='text' placeholder='Enter namespace name'
                                value={ name }
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicMember'>
                        <Form.Label column={true} sm={2}>Member</Form.Label>
                        <Col sm={10}>
                        <Form.Row>
                            <Form.Group as={Col} controlId='formBasicUserId'>
                                <Form.Label>All Users</Form.Label>
                                <Select options={options} multiSelect={true} onMultiChange={() => setUserId('test')} />
                            </Form.Group>
                            <Form.Group as={Col} controlId='formBasicRole'>
                                <Form.Label>Project Members</Form.Label>
                                <Select options={options2} multiSelect={true} onMultiChange={() => setRole('test')} />
                            </Form.Group>
                        </Form.Row>
                        </Col>
                    </Form.Group>
                </div>
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicQuota'>
                        <Form.Label column={true} sm={2}>Quota</Form.Label>
                        <Col sm={10}>
                            <Form.Row>
                                <Form.Group as={Col} controlId='formBasicCpu'>
                                    <Form.Label>CPU</Form.Label>
                                    <Form.Control type='number' placeholder='CPU'
                                    value={ cpu }
                                    onChange={(e: { target: { value: React.SetStateAction<number>; }; }) => setCpu(e.target.value)}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId='formBasicMemory'>
                                    <Form.Label>Memory</Form.Label>
                                    <Form.Control type='number' placeholder='memory size'
                                    value={ memory }
                                    onChange={(e: { target: { value: React.SetStateAction<number>; }; }) => setMemory(e.target.value)}/>
                                </Form.Group>
                            </Form.Row>
                        </Col>
                    </Form.Group>
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
                <div className='argo-form-row'>
                    <Form.Group as={Row} controlId='formBasicDescription'>
                        <Form.Label column={true} sm={2}>Description</Form.Label>
                        <Col sm={10}>
                            <Form.Control as='textarea'
                                value={description}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </div>
            </form>
        )}
    </Consumer>
  );
}