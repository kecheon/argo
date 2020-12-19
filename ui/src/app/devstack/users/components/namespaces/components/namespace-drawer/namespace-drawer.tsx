import * as React from 'react';
import {Loading} from '../../../../../../shared/components/loading';
import { Namespace } from '../../../models';
import {NamespaceService} from '../../../../../services/namespace-service';
import {Consumer} from '../../../../../../shared/context';
import { Form, Row, Col } from 'react-bootstrap';
import { TreeSelect } from 'antd';
import 'antd/dist/antd.css';

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
    selectedUsers?: any[];
    selectedRole?: any[];
    selected?: string;
    isSelected?: any;
    treeData: any[];
}

const userOptions = [
    {label: 'user1', value: 'user1'},
    {label: 'user2', value: 'user2'},
    {label: 'user3', value: 'user3'},
 ];
 const roleOptions = [
     { label: 'wf-app-admin', value: 'wf-app-admin' },
     { label: 'wf-tenant-admin', value: 'wf-tenant-admin' },
     { label: 'wf-executor', value: 'wf-executor' },
     { label: 'wf-viewer', value: 'wf-viewer'}
 ]


 const makeTreeData = () => {
     return userOptions.map(option => {
         return {
             title: option.label,
             value: option.value,
             selectable: false,
             children: roleOptions.map(role => {
                     return {
                         title: `${option.label}[${role.label}]`,
                         value: `${option.value}[${role.value}]`,
                         isLeaf: true
                     }
                 })
         }
     });
 }

export class NamespaceDrawer extends React.Component<NamespaceDrawerProps, NamespaceDrawerState> {
    constructor(props: NamespaceDrawerProps) {
        super(props);
        this.state = {
            isSelected: {
                userId: '',
                selected: false,
            },
            treeData: []
        };
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
        this.setState({selectedUsers: []})
        this.setState({selectedRole: []})
        const treeData = makeTreeData();
        this.setState({treeData}, () => {
            console.log(this.state.treeData);
        });
    }

    public changeHandler = (key: string) => (e: any) => {
        this.setState({
            namespace: {
                ...this.state.namespace,
                [key]: e.target.value
            }
        })
    }

    // public selectRoleHandler = (selectedUser: any) => (selectedRole: any) => {
    //     this.setState({isSelected: { userId: 'user id', selected: false }}, () => {
    //         console.log(this.state.isSelected);
    //         console.log(selectedUser);
    //     });
    // };
    
    // public selectHandler = (selectedOption: any) => {
    //     console.log(selectedOption);
    //     // this.setState({selectedUsers: selected})
    //     this.setState(prevState => ({
    //             selectedUsers: [...this.state.selectedUsers, selectedOption.value] }),
    //             () => {
    //                 this.setState(prevState => (
    //                     { selected: selectedOption.value }),
    //                     () => {
    //                         console.log(this.state.selected);
    //                     }
    //                 );
    //             }
    //         )
    //     this.setState({isSelected: { userId: selectedOption.id, selected: true }});
    // }

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
    public treeSelectChange = (e: any) => {
        console.log(e);
        this.setState({ selectedUsers: e });
    }
    public treeOnSelect= (e: any) => {
        console.log(e);
        // block if select selected user 
        const userName = e.split('[');
        const alreadySelected = this.state.selectedUsers.filter(user => {
            if (user.startsWith(userName[0])) {
                return true;
            } else {
                return false;
            }
        });
        if (alreadySelected.length > 0) {
            const modifiedSelectedUsers = this.state.selectedUsers.filter(item => {
                return !item.startsWith(userName[0])
            })
            this.setState({selectedUsers: [...modifiedSelectedUsers, e]})
        } else {
            this.setState({selectedUsers: [...this.state.selectedUsers, e]})
        }
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
                            <div className='argo-form-row' id='select-user'>
                                <Form.Group as={Row} controlId='formBasicUserId'>
                                    <Form.Label column={true} sm={2}>Member</Form.Label>
                                    <Col sm={10}>
                                        { this.renderTree() }
                                    </Col>
                                </Form.Group>
                            </div>
                          
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

    public renderTree() {
        return (
            <TreeSelect
              style={{ width: '100%' }}
              value={this.state.selectedUsers}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={this.state.treeData}
              placeholder='Please select member'
              treeDefaultExpandAll={false}
              multiple={true}
              treeCheckStrictly={true}
              onChange={this.treeSelectChange}
              onSelect={this.treeOnSelect}
            />
          );
    }
}
