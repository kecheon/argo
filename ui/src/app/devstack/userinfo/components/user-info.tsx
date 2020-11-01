import {Page} from 'argo-ui';
import * as React from 'react';
// import { useEffect } from 'react';
// import {RouteComponentProps} from 'react-router-dom';
// import {GetUserInfoResponse} from '../../../../models';
import {uiUrl} from '../../../shared/base';
// import {BasePage} from '../../../shared/components/base-page';
// import {ErrorNotice} from '../../../shared/components/error-notice';
// import {services} from '../../../shared/services';
import { UserState, UserStateAction } from '../../classes/current-user';
import withUserState from '../../classes/user-service-consumer';

interface UserProps {
    state: UserState;
    action: UserStateAction,
    dispatch: ({ type }: { type: string; payload?: any; }) => void;
}

const Info = (props: UserProps) => {
    // useEffect(() => {
    //     props.dispatch({ type: UserStateActionTypes.LOGGED_IN, payload: {
    //         isLoggedIn: true,
    //         username: 'admin@devstack.co.kr',
    //         permission: {}
    //     } });
    // });
    console.log(props);
    return (
        <Page title='User Info' toolbar={{breadcrumbs: [{title: 'User Info'}]}}>
            <div className='argo-container'>
                <div className='white-box'>
                    <h3>
                        <i className='fa fa-user-alt' /> User Info
                    </h3>
                    <a className='argo-button argo-button--base-o' href={uiUrl('login')}>
                        <i className='fa fa-shield-alt' /> Login / Logout
                    </a>
                </div>
            </div>
        </Page>
    );
}

export const UserInfo = withUserState(Info);