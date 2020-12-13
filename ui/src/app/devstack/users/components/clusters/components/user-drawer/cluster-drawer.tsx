import * as React from 'react';
// import {Workflow} from '../../../../../models';

// import {InlineTable} from '../../../../shared/components/inline-table/inline-table';
import {Loading} from '../../../../../../shared/components/loading';
// import {ConditionsPanel} from '../../../../shared/conditions-panel';
// import {formatDuration} from '../../../../shared/duration';
// import {services} from '../../../../shared/services';
import { Cluster } from '../../../models';
// import {WorkflowFrom} from '../workflow-from';
// import {WorkflowLabels} from '../workflow-labels/workflow-labels';
import {ClusterService} from '../../../../../services/cluster-service';
import { Form, Col, Row } from 'react-bootstrap';
import {Consumer} from '../../../../../../shared/context';

require('./workflow-drawer.scss');

const service = new ClusterService();

interface WorkflowDrawerProps {
    name: string;
    id: string;
    domain_id: string;
    links?: {self: string};
    onChange?: (key: string) => void;
}

interface WorkflowDrawerState {
    workflow?: Cluster;
    userProfile?: any;
}

export class ClusterDrawer extends React.Component<WorkflowDrawerProps, WorkflowDrawerState> {
    constructor(props: WorkflowDrawerProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        service.getDetail(this.props.id).then(userProfile => {
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
        // const {user} = this.state.userProile
        console.log(this.state.userProfile);
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
                                <Form.Group as={Row} controlId='formBasicId'>
                                    <Form.Label column={true} sm={2}>Cluster ID*</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder='Enter username'
                                            value={ this.state.userProfile.id } 
                                            onChange={this.changeHandler}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicUsername'>
                                    <Form.Label column={true} sm={2}>Cluster Name*</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder='Enter username'
                                            value={ this.state.userProfile.name } 
                                            onChange={this.changeHandler}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicUsername'>
                                    <Form.Label column={true} sm={2}>Domain Id</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder='Enter username'
                                            value={ this.state.userProfile.domain_id } 
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
                                    <Form.Label column={true} sm={2}>Parent ID</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='email' placeholder='Parent ID'
                                            onChange={this.changeHandler}
                                            value={ this.state.userProfile.parent_id } />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicEnabled'>
                                    <Form.Label column={true} sm={2}>Enabled</Form.Label>
                                    <Col sm={2}>
                                        <Form.Check inline={true} type={'checkbox'}
                                            value={this.state.userProfile.enabled}
                                            onChange={this.changeHandler}/>
                                    </Col>
                                    <Form.Label column={true} sm={2}>Is Domain</Form.Label>
                                    <Col sm={2}>
                                        <Form.Check inline={true} type={'checkbox'}
                                            value={this.state.userProfile.is_domain}
                                            onChange={this.changeHandler}/>
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
