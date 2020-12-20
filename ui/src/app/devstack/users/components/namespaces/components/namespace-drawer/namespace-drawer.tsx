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
    members?: any[];
    selectedUsers?: any[];
    selectedRole?: any[];
    selected?: string;
    isSelected?: any;
    treeData: any[];
    added?: any[];
    removed?: any[];
    initialMembers?: any[];
}

const userOptions = [
    {label: 'user1', value: 'user1', selectable: false},
    {label: 'user2', value: 'user2', selectable: false},
    {label: 'user3', value: 'user3', selectable: false},
 ];
 const roleOptions = [
     { label: 'wf-app-admin', value: 'd6b4c442568b4c81be7dd3d1edae068f' },
     { label: 'wf-tenant-admin', value: '1fd3a185d39047f6bc41e7e90de6f476' },
     { label: 'wf-executor', value: '7c9c9face23a4bfdb85f3366cc725105' },
     { label: 'wf-viewer', value: '0d65f613347b457ebc78c032a3bcc39b'}
 ]


 const makeTreeData = (members: any[]) => {
     return members.map(option => {
         console.log(option);
         return {
             title: option.name,
             value: option.id,
             disabled: true,
             children: roleOptions.map((role: any) => {
                     return {
                         title: `${option.name}[${role.label}]`,
                         value: `${option.id}[${role.value}]`,
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
            treeData: [],
            added: [],
            removed: []
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
            this.setState({namespace: flatten}, () => {
                namespaceService.getMembers(this.state.namespace.id)
                    .then(members => {
                        this.setState({members}, () => {
                            const treeData = makeTreeData(members);
                            this.setState({treeData}, () => {
                                const selectedUsers = members.filter((member: any) => {
                                    return member.roles.length > 0;
                                }).map((member: any) => {
                                    return {
                                        label: `${member.name}[${member.roles[0].name}]`,
                                        value: `${member.id}[${member.roles[0].id}]`
                                    };
                                });
                                this.setState({selectedUsers}, () => {
                                    this.setState({initialMembers: selectedUsers});
                                })
                            });
                        })
                    })
            });
        });
        this.setState({selectedUsers: []})
        this.setState({selectedRole: []})
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
        this.setState((prevState) => {
            // if e already exists nothing to do
            // if (this.state.added.includes(e) || this.state.removed.includes(e)) {
                // return { selectedUsers: e };
            // } else {
                const differ = setOperation(this.state.initialMembers, e);
                console.log('=================');
                console.log(e);
                console.log(this.state.initialMembers);
                console.log(differ);
                if (differ.equals) {
                    this.setState({added: []});
                    this.setState({removed: []});
                } else {
                    const removedItems = setOperation(this.state.initialMembers, differ.a_b).intersection;
                    const addedItems = setOperation(e, this.state.initialMembers).a_b;
                    this.setState({removed: removedItems});
                    this.setState({added: addedItems});
                }
                return { selectedUsers: e };
            // }
        });
    }
    public treeOnSelect= (e: any, node: any) => {
        console.log(e, node);
        // block if select selected user 
        const userName = e.split('[');
        const alreadySelected = this.state.selectedUsers.filter(user => {
            if (user.value.startsWith(userName[0])) {
                return true;
            } else {
                return false;
            }
        });
        if (alreadySelected.length > 0) {
            const modifiedSelectedUsers = this.state.selectedUsers.filter(item => {
                return !item.value.startsWith(userName[0])
            })
            this.setState({selectedUsers: [...modifiedSelectedUsers, node]})
        } else {
            this.setState({selectedUsers: [...this.state.selectedUsers, node]})
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
                                        { (this.state.added.length > 0) && 
                                            <ul>
                                                added: {this.state.added.map(item => {
                                                        return (<li key={item.value}>{item.label}</li>);
                                                    }
                                                )}
                                            </ul>
                                        }
                                        { (this.state.removed.length > 0) && 
                                            <ul>
                                                removed: {this.state.removed.map(item => {
                                                        return (<li key={item.value}>{item.label}</li>);
                                                    }
                                                )}
                                            </ul>
                                        }
                                        { this.renderTree(this.state.members) }
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

    public renderTree(members: any[]) {
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
            //   onSelect={this.treeOnSelect}
            />
          );
    }
}

const makeUnique = (input: any[]) => {
    const result = [];
    const map = new Map();
    for (const item of input) {
        if(!map.has(item.value)){
            map.set(item.value, true);    // set any value to Map
            result.push({
                value: item.value,
                label: item.label
            });
        }
    }
    console.log(result) ;
    return result;
}

const setOperation = (list1: any[], list2: any[]) => {
    // Generic helper function that can be used for the three operations:        
    const operation = (list11: any[], list21: any[], isUnion = false) =>
        list11.filter(
            (set => (a: { value: any; }) => isUnion === set.has(a.value))(new Set(list21.map(b => b.value)))
    );

    // Following functions are to be used:
    const inBoth = (list12: any[], list22: any[]) => operation(list12, list22, true);
    const inFirstOnly = operation;
    const inSecondOnly = (list13: any[], list23: any[]) => inFirstOnly(list23, list13);

    // check if they equals
    let objectsAreSame = true;
    if (list1.length !== list2.length) {
        objectsAreSame = false;
    }
    for(const propertyName in list1) {
       if(list1[propertyName] !== list2[propertyName]) {
          objectsAreSame = false;
          break;
       }
    }

    console.log('inBoth:', inBoth(list1, list2)); 
    console.log('inFirstOnly:', inFirstOnly(list1, list2)); 
    console.log('inSecondOnly:', inSecondOnly(list1, list2));
    const union = inBoth(list1, list2).concat(inFirstOnly(list1, list2)).concat(inSecondOnly(list1, list2));
    return {intersection: inBoth(list1, list2), a_b: inFirstOnly(list1, list2), b_a: inSecondOnly(list1, list2), union, equals: objectsAreSame}
}