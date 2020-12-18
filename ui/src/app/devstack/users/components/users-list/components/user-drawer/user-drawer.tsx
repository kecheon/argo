import * as React from 'react';
import {Loading} from '../../../../../../shared/components/loading';
import { User } from '../../../models';
import {UserService} from '../../../../../services/user-service';
import {NamespaceService} from '../../../../../services/namespace-service';
import { Form, Col, Row } from 'react-bootstrap';
import {Consumer} from '../../../../../../shared/context';


require('./workflow-drawer.scss');

const userService = new UserService();
const namespaceService = new NamespaceService();

interface UserDrawerProps {
    name: string;
    id: string;
    domain_id: string;
    links?: {self: string};
    enabled: boolean;
    onChange?: (key: string) => void;
}

interface UserDrawerState {
    user?: User;
    password?: string;
    password2?: string;
    namespaceOptions?: string[];
}

export class UserDrawer extends React.Component<UserDrawerProps, UserDrawerState> {
    constructor(props: UserDrawerProps) {
        super(props);
        this.state = {
            user: null,
            password: '',
            password2: '',
            namespaceOptions: []
        };
    }
    
    public componentDidMount() {
        userService.getUserProfile(this.props.id).then(userProfile => {
            console.log(userProfile);
            this.setState({user: userProfile});
        });
        namespaceService.get().then(ns => {
            console.log(ns);
            const namespaceOptions = ns.namespaces.map((namespace: any) => {
                return { option: namespace.name, value: namespace.id }
            })
            this.setState({namespaceOptions})
        });
    }

    public changeHandler = (key: string) => (e: any) => {
        this.setState({
            user: {
                ...this.state.user,
                [key]: e.target.value
            }
        })
    }
    public submitHandler = async (e: any) => {
        e.preventDefault();
        console.log(this.state.user);
        const res = await userService.updateUser(this.state.user.id, this.state.user);
        if (res.status === 'success') {
            alert('User profile update succeeded');
        } else {
            alert('User profile update failed');
        }
    }
    public submitPasswordHandler = async (e: any) => {
        e.preventDefault();
        if (this.state.password !== this.state.password2) {
            alert('Passwords are not the consistent!');
        } else {
            this.setState({user: {...this.state.user, password: this.state.password }})
            const payload = this.state.user
            payload.password = this.state.password
            const res = await userService.updateUser(this.state.user.id, payload );
            if (res.status === 'success') {
                alert('Password changed');
            } else {
                alert('Password not changed');
            }
        }
    }
    
    public render() {
        if (!this.state.user) {
            return <Loading />;
        }
        return (
            <Consumer>
                {ctx => (
                    <div className='workflow-drawer'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>User Name</th>
                                    <td>{this.state.user.name}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{this.state.user.description}</td>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <td>{this.state.user.id}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{this.state.user.email}</td>
                                </tr>
                                <tr>
                                    <th>Enabled</th>
                                    <td>{this.state.user.enabled}</td>
                                </tr>
                                <tr>
                                    <th>Primary Namespace ID</th>
                                    <td>{this.state.user.primary_namespace_id}</td>
                                </tr>
                                <tr>
                                    <th>Primary Namespace Name</th>
                                    <td> no data available</td>
                                </tr>
                            </tbody>
                        </table>

                        <form onSubmit={this.submitHandler}>
                            <div className='login__form-row'>
                                <button className='argo-button argo-button--base' type='submit'>
                                    <i className='fa fa-plus-circle' /> Submit
                                </button>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicUsername'>
                                    <Form.Label column={true} sm={2}>User Name*</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder='Enter username'
                                            value={ this.state.user.name } 
                                            // value={ this.props.name }
                                            onChange={this.changeHandler('name')}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicEmail'>
                                    <Form.Label column={true} sm={2}>Email</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='email' placeholder='Email'
                                            onChange={this.changeHandler('email')}
                                            value={ this.state.user.email } />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicDescription'>
                                    <Form.Label column={true} sm={2}>Description</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control as='textarea' placeholder='Description'
                                        value={ this.state.user.description } 
                                        onChange={this.changeHandler('description')} />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicProject' className='row'>
                                    <Form.Label column={true} sm={2}>Primary Project(Namespace)</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control as='select'>
                                            {
                                                this.state.namespaceOptions.map((option: any, index: number) => {
                                                    return (
                                                        <option key={index} value={option.value}>{option.option}</option>
                                                    );
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicEnabled'>
                                    <Form.Label column={true} sm={2}>Enabled</Form.Label>
                                    <Col sm={2}>
                                        <Form.Check inline={true} type={'checkbox'}
                                            defaultChecked={this.state.user.enabled}
                                            value={ this.state.user.enabled } 
                                            onChange={() => this.setState({ 
                                                user: {...this.state.user, enabled: !this.state.user.enabled }
                                            })} />
                                    </Col>
                                </Form.Group>
                            </div>
                        </form>
                        <div className='workflow-drawer'>
                            <form onSubmit={this.submitPasswordHandler}>
                                <div className='login__form-row'>
                                    <button className='argo-button argo-button--base' type='submit'>
                                        <i className='fa fa-plus-circle' /> Change Password
                                    </button>
                                </div>
                                <div className='argo-form-row'>
                                    <Form.Group as={Row} controlId='formBasicUsername'>
                                        <Form.Label column={true} sm={2}>Password*</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type='password' placeholder='password'
                                                value={ this.state.password } 
                                                onChange={(e: any) =>  this.setState({password: e.target.value})}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <div className='argo-form-row'>
                                    <Form.Group as={Row} controlId='formBasicEmail'>
                                        <Form.Label column={true} sm={2}>Confirm Password</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type='password'
                                                placeholder='password'
                                                onChange={(e: any) =>  this.setState({password2: e.target.value})}
                                                value={ this.state.password2 } />
                                        </Col>
                                    </Form.Group>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                )}
            </Consumer>
        );
    }
}
