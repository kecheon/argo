import * as React from 'react';
import {Redirect, Route, RouteComponentProps, Switch} from 'react-router';
import {UsersOverview} from './menu';
import {UsersList} from './users-list/users-list';

export const UsersContainer = (props: RouteComponentProps<any>) => (
    <div className='argo-container'>
        <Switch>
            <Route exact={true} path={`${props.match.path}`} component={UsersOverview} />
            <Route exact={true} path={`${props.match.path}/list`} component={UsersList} />
            <Redirect path='*' to={`${props.match.path}`} />
        </Switch>
    </div>
);