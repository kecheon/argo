import * as React from 'react';
// import {Workflow} from '../../../../../models';

// import {InlineTable} from '../../../../shared/components/inline-table/inline-table';
import {Loading} from '../../../../../../shared/components/loading';
// import {ConditionsPanel} from '../../../../shared/conditions-panel';
// import {formatDuration} from '../../../../shared/duration';
// import {services} from '../../../../shared/services';
import { User } from '../../../models';
// import {WorkflowFrom} from '../workflow-from';
// import {WorkflowLabels} from '../workflow-labels/workflow-labels';
import {UserService} from '../../../../../services/user-service';
import { ListGroup, Form, Col, Row } from 'react-bootstrap';
import {Consumer} from '../../../../../../shared/context';

require('./workflow-drawer.scss');

const userService = new UserService();

interface WorkflowDrawerProps {
    name: string;
    id: string;
    domain_id: string;
    links?: {self: string};
    enabled: boolean;
    onChange?: (key: string) => void;
}

interface WorkflowDrawerState {
    user?: User;
}

export class WorkflowDrawer extends React.Component<WorkflowDrawerProps, WorkflowDrawerState> {
    constructor(props: WorkflowDrawerProps) {
        super(props);
        this.state = {};
    }
    
    public componentDidMount() {
        userService.getUserProfile(this.props.id).then(userProfile => {
            this.setState({user: userProfile.user});
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
    
    public render() {
        if (!this.state.user) {
            return <Loading />;
        }
        // const {user} = this.state.userProile
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
                                    <td>{this.state.user.default_project_id}</td>
                                </tr>
                                <tr>
                                    <th>Primary Namespace Name</th>
                                    <td> no data available</td>
                                </tr>
                            </tbody>
                        </table>

                        <form>
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
                                <Form.Group as={Row} controlId='formBasicProject'>
                                    <Form.Label column={true} sm={2}>Primary Project(Namespace)</Form.Label>
                                    <Col sm={10}>
                                    <Form.Control as="select">
                                        <option>Service 1</option>
                                        <option>Service 2</option>
                                        <option>Service 3</option>
                                    </Form.Control>
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicEnabled'>
                                    <Form.Label column={true} sm={2}>Enabled</Form.Label>
                                    <Col sm={2}>
                                        <Form.Check inline={true} type={'checkbox'}
                                            onChange={this.changeHandler('enabled')}/>
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
