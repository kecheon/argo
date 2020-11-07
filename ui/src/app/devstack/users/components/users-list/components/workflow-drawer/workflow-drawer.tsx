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
import { Form } from 'react-bootstrap';
import {Consumer} from '../../../../../../shared/context';

require('./workflow-drawer.scss');

const userService = new UserService();

interface WorkflowDrawerProps {
    name: string;
    id: string;
    domain_id: string;
    links?: {self: string};
    onChange: (key: string) => void;
}

interface WorkflowDrawerState {
    workflow?: User;
    userProfile?: any;
}

export class WorkflowDrawer extends React.Component<WorkflowDrawerProps, WorkflowDrawerState> {
    constructor(props: Readonly<WorkflowDrawerProps>) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        userService.getProfile(this.props.links.self).then(userProfile => {
            this.setState({userProfile});
        });
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
                                <Form.Group controlId='formBasicUsername'>
                                    <Form.Label>User Name*</Form.Label>
                                    <Form.Control type='text' placeholder='Enter username'
                                    value={ this.state.userProfile.name } />
                                </Form.Group>{' '}
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group controlId='formBasicDescription'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' placeholder='Description'
                                    value={ this.state.userProfile.description } />
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group controlId='formBasicEmail'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' placeholder='Email'
                                    value={ this.state.userProfile.email } />
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group controlId='formBasicPassword1'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' placeholder='password'
                                    value={ this.state.userProfile.password } />
                                </Form.Group>
                            </div>
                            <div className='login__footer'>
                                <a href='https://argoproj.io' target='_blank'>
                                    <img className='logo-image' src='assets/images/argologo.svg' alt='argo' />
                                </a>
                            </div>
                        </form>
                    </div>
                )}
            </Consumer>
        );
    }
}
