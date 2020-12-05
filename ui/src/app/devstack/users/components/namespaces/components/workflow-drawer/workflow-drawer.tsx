import * as React from 'react';
// import {Workflow} from '../../../../../models';

// import {InlineTable} from '../../../../shared/components/inline-table/inline-table';
import {Loading} from '../../../../../../shared/components/loading';
// import {ConditionsPanel} from '../../../../shared/conditions-panel';
// import {formatDuration} from '../../../../shared/duration';
// import {services} from '../../../../shared/services';
import { Namespace } from '../../../models';
// import {WorkflowFrom} from '../workflow-from';
// import {WorkflowLabels} from '../workflow-labels/workflow-labels';
import {NamespaceService} from '../../../../../services/namespace-service';
import {Consumer} from '../../../../../../shared/context';
import { Form, Row, Col } from 'react-bootstrap';

require('./workflow-drawer.scss');

const namespaceService = new NamespaceService();

interface WorkflowDrawerProps {
    name: string;
    id: string;
    domain_id: string;
    links?: {self: string};
    onChange: (key: string) => void;
}

interface WorkflowDrawerState {
    workflow?: Namespace;
    namespaceProfile?: any;
}

export class WorkflowDrawer extends React.Component<WorkflowDrawerProps, WorkflowDrawerState> {
    constructor(props: Readonly<WorkflowDrawerProps>) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        namespaceService.getProfile(this.props.links.self).then(namespaceProfile => {
            this.setState({namespaceProfile});
        });
    }

    public render() {
        if (!this.state.namespaceProfile) {
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
                                <button className='argo-button argo-button--base' type='button' onClick={() => ctx.navigation.goto('.', {new: null})}>
                                    <i className='fa fa-times-circle' /> Cancel
                                </button>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicName'>
                                    <Form.Label column={true} sm={2}>Name*</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder='Enter namespace name'
                                            value={ this.state.namespaceProfile.name }/>
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicUserId'>
                                    <Form.Label column={true} sm={2}>Member</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder='User id'
                                            value={ this.state.namespaceProfile.userId } />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicRole'>
                                    <Form.Label column={true} sm={2}>Role</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='text' placeholder='Role'
                                            value={ this.state.namespaceProfile.role } />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicCpu'>
                                    <Form.Label column={true} sm={2}>CPU</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='number' placeholder='CPU'
                                            value={ this.state.namespaceProfile.quota_cpu } />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicMemory'>
                                    <Form.Label column={true} sm={2}>Memory</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type='number' placeholder='memory size'
                                            value={ this.state.namespaceProfile.quota_ram} />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group as={Row} controlId='formBasicEnabled'>
                                    <Form.Label column={true} sm={2}>Enabled</Form.Label>
                                    <Col sm={2}>
                                        <Form.Check inline={true} type={'checkbox'}
                                            value={ this.state.namespaceProfile.enabled } />
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
