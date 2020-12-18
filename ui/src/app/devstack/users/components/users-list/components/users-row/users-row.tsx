import * as React from 'react';
import {User} from '../../../models';
import {UserDrawer} from '../user-drawer/user-drawer';

interface UsersRowProps {
    user: User;
    onChange: (key: string) => void;
    select: (wf: User) => void;
    checked: boolean;
}

interface UserRowState {
    hideDrawer: boolean;
}

export class UsersRow extends React.Component<UsersRowProps, UserRowState> {
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
                        <div className='columns small-2'>{wf.name}</div>
                        <div className='columns small-2'>{wf.description}</div>
                        <div className='columns small-2'>{wf.email}</div>
                        <div className='columns small-2'>{wf.id}</div>
                        <div className='columns small-2'>
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
                        <UserDrawer
                            name={wf.name}
                            id={wf.id}
                            domain_id={wf.domain_id}
                            links={wf.links}
                            enabled={wf.enabled}
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
