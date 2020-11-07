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
import { Form } from 'react-bootstrap';

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
                                <Form.Group controlId='formBasicName'>
                                    <Form.Label>Name*</Form.Label>
                                    <Form.Control type='text' placeholder='Enter namespace name'
                                    value={ this.state.namespaceProfile.name }/>
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group controlId='formBasicUserId'>
                                    <Form.Label>Member</Form.Label>
                                    <Form.Control type='text' placeholder='User id'
                                    value={ this.state.namespaceProfile.userId } />
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group controlId='formBasicRole'>
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type='text' placeholder='Role'
                                    value={ this.state.namespaceProfile.role } />
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group controlId='formBasicCpu'>
                                    <Form.Label>CPU</Form.Label>
                                    <Form.Control type='number' placeholder='CPU'
                                    value={ this.state.namespaceProfile.quota_cpu } />
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group controlId='formBasicMemory'>
                                    <Form.Label>Memory</Form.Label>
                                    <Form.Control type='number' placeholder='memory size'
                                    value={ this.state.namespaceProfile.quota_ram} />
                                </Form.Group>
                            </div>
                            <div className='argo-form-row'>
                                <Form.Group controlId='formBasicEnabled'>
                                    <Form.Label>Enabled</Form.Label>
                                    <Form.Control type='boolean' placeholder='Enabled'
                                    value={ this.state.namespaceProfile.enabled } />
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
