// import {Ticker} from 'argo-ui/src/index';
import * as React from 'react';
// import {Link} from 'react-router-dom';
// import {Workflow} from '../../../../../models';
import {User} from '../../../models';
// import {uiUrl} from '../../../../shared/base';
// import {DurationPanel} from '../../../../shared/components/duration-panel';
// import {PhaseIcon} from '../../../../shared/components/phase-icon';
// import {Timestamp} from '../../../../shared/components/timestamp';
// import {wfDuration} from '../../../../shared/duration';
import {WorkflowDrawer} from '../workflow-drawer/workflow-drawer';

interface WorkflowsRowProps {
    // workflow: Workflow;
    user: User;
    onChange: (key: string) => void;
    select: (wf: User) => void;
    checked: boolean;
}

interface WorkflowRowState {
    hideDrawer: boolean;
}

export class WorkflowsRow extends React.Component<WorkflowsRowProps, WorkflowRowState> {
    constructor(props: WorkflowsRowProps) {
        super(props);
        this.state = {
            hideDrawer: true
        };
    }

    public render() {
        const wf = this.props.user;
        return (
            <div className='workflows-list__row-container'>
                <div className='row argo-table-list__row'>
                    <div className='columns small-1 workflows-list__status'>
                        <input
                            type='checkbox'
                            className='workflows-list__status--checkbox'
                            checked={this.props.checked}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                            onChange={e => {
                                this.props.select(this.props.user);
                            }}
                        />
                        {/* <PhaseIcon value={wf.name} /> */}
                    </div>
                    <div className='row small-11'>
                        <div className='columns small-2'>{wf.name}</div>
                        <div className='columns small-2'>Description</div>
                        <div className='columns small-2'>{wf.email}</div>
                        <div className='columns small-2'>{wf.id}</div>
                        <div className='columns small-2'>{wf.enabled ? 'Yes' : 'No'}</div>
                        <div className='columns small-2'>{wf.domain_id}</div>
                        {/* <div className='columns small-1'>
                            <div className='workflows-list__labels-container'>
                                <div
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({hideDrawer: !this.state.hideDrawer});
                                    }}
                                    className={`workflows-row__action workflows-row__action--${this.state.hideDrawer ? 'show' : 'hide'}`}>
                                    {this.state.hideDrawer ? (
                                        <span>
                                            SHOW <i className='fas fa-caret-down' />{' '}
                                        </span>
                                    ) : (
                                        <span>
                                            HIDE <i className='fas fa-caret-up' />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div> */}
                    </div>
                    {this.state.hideDrawer ? (
                        <span />
                    ) : (
                        <WorkflowDrawer
                            name={wf.name}
                            id={wf.id}
                            domain_id={wf.domain_id}
                            links={wf.links}
                            onChange={key => {
                                this.props.onChange(key);
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }
}
