import * as React from 'react';
import {Loading} from '../../../../../../shared/components/loading';
import { Namespace } from '../../../models';
import {NamespaceService} from '../../../../../services/namespace-service';
import {Consumer} from '../../../../../../shared/context';
import { Form, Row, Col } from 'react-bootstrap';
// import {MultiSelect} from './multiselector';
import Select from 'react-select';

require('./workflow-drawer.scss');

const namespaceService = new NamespaceService();

interface NamespaceDrawerProps {
    name: string;
    domain_id: string;
    enabled?: boolean;
    id: string;
    is_domain?: boolean;
    parent_id?: string;
    k8s_ns?: string;
    quota_cpu?: number;
    quota_ram?: number; 
    onChange: (key: string) => void;
}

interface NamespaceDrawerState {
    namespace?: Namespace;
    // userOptions?: any[];
    selectedUsers?: any[];
    selectedRole?: any[];
    selected?: string;
    isSelected?: any;
}

const userOptions = [
    {label: 'user1', value: 'user1'},
    {label: 'user2', value: 'user2'},
    {label: 'user3', value: 'user3'},
 ];
 const roleOptions = [
     { label: 'wf-app-admin', value: 'wf-app-admin' },
     { label: 'executor', value: 'executor' },
     { label: 'viewer', value: 'viewer'}
 ]

export class NamespaceDrawer extends React.Component<NamespaceDrawerProps, NamespaceDrawerState> {
    constructor(props: NamespaceDrawerProps) {
        super(props);
        this.state = {
            isSelected: {
                userId: '',
                selected: false,
            }
        };
    }

    public cancelDrawer() {
        console.log('cancel');
    }
    public componentDidMount() {
        namespaceService.getProfile(this.props.id).then(namespace=> {
            const flatten = Object.assign(
                {}, 
                ...function _flatten(o): any { 
                  return [].concat(...Object.keys(o)
                    .map(k => 
                      typeof o[k] === 'object' ?
                        _flatten(o[k]) : 
                        ({[k]: o[k]})
                    )
                  );
                }(namespace)
              )
            console.log(flatten);
            this.setState({namespace: flatten});
        });
        // this.setState({userOptions: [
        //     {label: 'user1', value: 'user1'},
        //     {label: 'user2', value: 'user2'},
        //     {label: 'user3', value: 'user3'},
        //  ]})
        this.setState({selectedUsers: []})
        this.setState({selectedRole: []})
    }

    public changeHandler = (key: string) => (e: any) => {
        console.log(e.target.value);
        this.setState({
            namespace: {
                ...this.state.namespace,
                [key]: e.target.value
            }
        })
    }

    public selectRoleHandler = (selectedRole: any) => {
        console.log(this.state.selectedUsers);
        this.setState({isSelected: { userId: 'user id', selected: false }});
    };
    
    public selectHandler = (selectedOption: any) => {
        console.log(selectedOption);
        // this.setState({selectedUsers: selected})
        this.setState(
            { selectedUsers: [...this.state.selectedUsers, selectedOption.value] }
        );
        this.setState(
            { selected: selectedOption.value }
        );
        // this.setState({ selectedUsers: selected });
        console.log(this.state.selectedUsers);
        this.setState({isSelected: { userId: selectedOption.id, selected: true }});
    }

    public submitHandler = async (e: any) => {
        e.preventDefault();
        console.log(this.state.namespace);

        /******  update payload에 싣기 위해서 NamespaceForm type을 맞춰서 보낸다. *****/

        // const res = await namespaceService.update(this.state.namespace);
        // if (res.status === 'success') {
        //     alert('Namespace updated');
        // } else {
        //     alert('Namespace update failed')
        // }
    }

    public render() {
        if (!this.state.namespace) {
            return <Loading />;
        }
        return (
            <Consumer>
                {ctx => (
                    <div className='workflow-drawer'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Namespace Name</th>
                                    <td>{this.state.namespace.name}</td>
                                </tr>
                                <tr>
                                    <th>Namespace ID</th>
                                    <td>{this.state.namespace.id}</td>
                                </tr>
                                <tr>
                                    <th>Domain ID</th>
                                    <td>{this.state.namespace.domain_id}</td>
                                </tr>
                                <tr>
                                    <th>Enabled</th>
                                    <td>{this.state.namespace.enabled ? 'Y' : 'N'}</td>
                                </tr>
                                {/* <tr>
                                    {Object.entries(this.state.namespace.wf).map(([key, value]) => {
                                        return (
                                        <><tr><th>{key}</th>
                                                <td>{value}</td></tr></>
                                        )
                                    })}
                                </tr> */}
                                <tr>
                                    <th>Quota</th><td/>
                                </tr>
                                <tr>
                                    <th>CPU</th>
                                    <td>{this.state.namespace.quota_cpu}</td>
                                </tr>
                                <tr>
                                    <th>Memory</th>
                                    <td>{this.state.namespace.quota_ram}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{this.state.namespace.description}</td>
                                </tr>
                            </tbody>
                        </table>
                        <form onSubmit={this.submitHandler}>
                            <div className='login__form-row'>
                                <button className='argo-button argo-button--base' type='submit'>
                                    <i className='fa fa-plus-circle' /> Submit
                                </button>
                                {/* <button className='argo-button argo-button--base' type='button' onClick={this.cancelDrawer}>
                                    <i className='fa fa-times-circle' /> Cancel
                                </button> */}
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicName'>
                                    <Form.Label column={true} sm={2}>Name*</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder='Enter namespace name'
                                            value={ this.state.namespace.name }
                                            onChange={this.changeHandler('name')}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicUserId'>
                                    <Form.Label column={true} sm={2}>Member</Form.Label>
                                    <Col sm={10}>
                                        <Select options={userOptions}
                                            isMulti={true}
                                            onChange={this.selectHandler} />
                                    </Col>
                                </Form.Group>
                            </div>
                            { this.state.isSelected.selected &&
                                <div className='argo-form-row'>
                                    <Form.Group as={Row} controlId='formBasicRole'>
                                        <Form.Label column={true} sm={2}>Role</Form.Label>
                                        <Col sm={10}>
                                            <Select options={roleOptions}
                                                onChange={this.selectRoleHandler} />
                                        </Col>
                                    </Form.Group>
                                </div>
                            }
                            {/* <div className='argo-form-row'>
                                { 
                                    Object.entries(this.state.namespace.wf).map(([key, value]) => {
                                        return (
                                            // tslint:disable-next-line:jsx-key
                                            <Form.Group as={Row} controlId='formBasicCpu'>
                                                <Form.Label column={true} sm={2}>{key}</Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type='number' 
                                                        name={key}
                                                        value={value}
                                                        onChange={this.changeHandler(key)}
                                                    />
                                                </Col>
                                            </Form.Group>
                                        )
                                    })
                                }
                            </div> */}
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicCpu'>
                                    <Form.Label column={true} sm={2}>CPU</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='number' 
                                            value={this.state.namespace.quota_cpu}
                                            onChange={this.changeHandler('quota_cpu')}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicMemory'>
                                    <Form.Label column={true} sm={2}>Memory</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='number' 
                                            value={this.state.namespace.quota_ram}
                                            onChange={this.changeHandler('quota_ram')}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>

                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicEnabled'>
                                    <Form.Label column={true} sm={2}>Enabled</Form.Label>
                                    <Col sm={2}>
                                        <Form.Check inline={true} type={'checkbox'}
                                            defaultChecked={this.state.namespace.enabled}
                                            value={ this.state.namespace.enabled } 
                                            onChange={this.changeHandler('enabled')}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                        </form>
                    </div>
                )}
            </Consumer>
          );
    }
}
