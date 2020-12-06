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
import { Form, Col, Row } from 'react-bootstrap';
import {Consumer} from '../../../../../../shared/context';

require('./workflow-drawer.scss');

const userService = new UserService();

interface WorkflowDrawerProps {
    name: string;
    id: string;
    domain_id: string;
    links?: {self: string};
    onChange?: (key: string) => void;
}

interface WorkflowDrawerState {
    workflow?: User;
    userProfile?: any;
}

export class WorkflowDrawer extends React.Component<WorkflowDrawerProps, WorkflowDrawerState> {
    constructor(props: WorkflowDrawerProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        userService.getUserProfile(this.props.id).then(userProfile => {
            this.setState({userProfile});
        });
    }
    public changeHandler = (e: any) => {
        console.log(e);
    }

    public render() {
        if (!this.state.userProfile) {
            return <Loading />;
        }
        return (
            <Consumer>
                {ctx => (
                    <div className='workflow-drawer'>
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
                                            value={ this.state.userProfile.name } 
                                            onChange={this.changeHandler}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicDescription'>
                                    <Form.Label column={true} sm={2}>Description</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control as='textarea' placeholder='Description'
                                        value={ this.state.userProfile.description } 
                                        onChange={this.changeHandler} />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicEmail'>
                                    <Form.Label column={true} sm={2}>Email</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='email' placeholder='Email'
                                            onChange={this.changeHandler}
                                            value={ this.state.userProfile.email } />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicPassword1'>
                                    <Form.Label column={true} sm={2}>Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='password' placeholder='password'
                                            onChange={this.changeHandler}
                                            value={ this.state.userProfile.password } />
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
