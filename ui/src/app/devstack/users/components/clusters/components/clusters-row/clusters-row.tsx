// import {Ticker} from 'argo-ui/src/index';
import * as React from 'react';
// import {Link} from 'react-router-dom';
// import {Workflow} from '../../../../../models';
import {Cluster} from '../../../models';
// import {uiUrl} from '../../../../shared/base';
// import {DurationPanel} from '../../../../shared/components/duration-panel';
// import {PhaseIcon} from '../../../../shared/components/phase-icon';
// import {Timestamp} from '../../../../shared/components/timestamp';
// import {wfDuration} from '../../../../shared/duration';
import {ClusterDrawer} from '../user-drawer/cluster-drawer';

interface UsersRowProps {
    // workflow: Workflow;
    user: Cluster;
    onChange: (key: string) => void;
    select: (wf: Cluster) => void;
    checked: boolean;
}

interface UserRowState {
    hideDrawer: boolean;
}

export class ClustersRow extends React.Component<UsersRowProps, UserRowState> {
    constructor(props: UsersRowProps) {
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
                        <div className='columns small-2'>{wf.id}</div>
                        <div className='columns small-1'>{wf.name}</div>
                        <div className='columns small-2'>{wf.domain_id}</div>
                        <div className='columns small-2'>{wf.description}</div>
                        <div className='columns small-1'>{wf.enabled ? 'Yes' : 'No'}</div>
                        <div className='columns small-2'>{wf.parent_id}</div>
                        <div className='columns small-1'>{wf.is_domain ? 'Yes' : 'No'}</div>
                        <div className='columns small-1'>
                            <div className='workflows-list__labels-container'>
                                <div
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({hideDrawer: !this.state.hideDrawer});
                                    }}
                                    className={`workflows-row__action workflows-row__action--${this.state.hideDrawer ? 'show' : 'hide'}`}>
                                    {this.state.hideDrawer ? (
                                        <span>
                                            EDIT <i className='fas fa-caret-down' />{' '}
                                        </span>
                                    ) : (
                                        <span>
                                            CANCEL <i className='fas fa-caret-up' />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.hideDrawer ? (
                        <span />
                    ) : (
                        <ClusterDrawer
                            name={wf.name}
                            id={wf.id}
                            domain_id={wf.domain_id}
                            onChange={(key: string) => {
                                this.props.onChange(key);
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }
}
