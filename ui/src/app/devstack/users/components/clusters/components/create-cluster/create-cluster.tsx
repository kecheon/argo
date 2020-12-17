import * as React from 'react';
import {Form} from 'react-bootstrap';
import { useState } from 'react';
import {ClusterService} from '../../../../../services/cluster-service';
import {Consumer} from '../../../../../../shared/context';
import { Select } from 'argo-ui';
import { Row, Col } from 'react-bootstrap';

interface ClusterForm {
  name: string;
  description: string;
  enabled: boolean;
}


export default () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [enabled, setEnabled] = useState(false);
  const service = new ClusterService();
  const handleSubmit = async (e: any) => {
      e.preventDefault();
      const newCluster: ClusterForm = {
          name,
          description,
          enabled,
      }
      const result = await service.create(newCluster);
      if (result.status === 'success') {
          // post new cluster to backend
      } else {
          alert(`Cluster create Error ${name}`);
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
                        <Form.Label column={true} sm={2}>Cluster Name*</Form.Label>
                        <Col sm={10}>
                            <Form.Control type='text' placeholder='Enter cluster name'
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

