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
    userProfile?: string;
}

export class WorkflowDrawer extends React.Component<WorkflowDrawerProps, WorkflowDrawerState> {
    constructor(props: Readonly<WorkflowDrawerProps>) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        userService.getProfile(this.props.links.self).then(userProfile => {
            console.log(userProfile);
            this.setState({userProfile});
        });
    }

    public render() {
        if (!this.state.workflow) {
            return <Loading />;
        }
        return (
            <div className='workflow-drawer'>
                <div>
                    drawer
                    { this.state.userProfile }
                </div>
                {/* {!wf.status.message ? null : (
                    <div className='workflow-drawer__section workflow-drawer__message'>
                        <div className='workflow-drawer__title workflow-drawer__message--label'>MESSAGE</div>
                        <div className='workflow-drawer__message--content'>{wf.status.message}</div>
                    </div>
                )}
                {!wf.status.conditions ? null : (
                    <div className='workflow-drawer__section'>
                        <div className='workflow-drawer__title'>CONDITIONS</div>
                        <div className='workflow-drawer__conditions'>
                            <ConditionsPanel conditions={wf.status.conditions} />
                        </div>
                    </div>
                )} */}
                {/* {!wf.status.resourcesDuration ? null : (
                    <div className='workflow-drawer__section'>
                        <div>
                            <InlineTable
                                rows={[
                                    {
                                        left: (
                                            <div className='workflow-drawer__title'>
                                                RESOURCES DURATION&nbsp;
                                                <a href='https://github.com/argoproj/argo/blob/master/docs/resource-duration.md' target='_blank'>
                                                    <i className='fas fa-info-circle' />
                                                </a>
                                            </div>
                                        ),
                                        right: (
                                            <div>
                                                <div>
                                                    <span className='workflow-drawer__resourcesDuration--value'>{formatDuration(wf.status.resourcesDuration.cpu, 1)}</span>
                                                    <span>(*1 CPU)</span>
                                                </div>
                                                <div>
                                                    <span className='workflow-drawer__resourcesDuration--value'>{formatDuration(wf.status.resourcesDuration.memory, 1)}</span>
                                                    <span>(*100Mi Memory)</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </div>
                    </div>
                )} */}
                <div className='workflow-drawer__section'>
                    <div className='workflow-drawer__title'>FROM</div>
                    <div className='workflow-drawer__workflowFrom'>
                        From
                        {/* <WorkflowFrom namespace={wf.metadata.namespace} labels={wf.metadata.labels} /> */}
                    </div>
                </div>
                <div className='workflow-drawer__section workflow-drawer__labels'>
                    <div className='workflow-drawer__title'>LABELS</div>
                        Labels
                    {/* <div className='workflow-drawer__labels--list'>
                        <WorkflowLabels
                            workflow={wf}
                            onChange={key => {
                                this.props.onChange(key);
                            }}
                        />
                    </div> */}
                </div>
            </div>
        );
    }
}
