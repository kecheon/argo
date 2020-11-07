import * as React from 'react';
import {Redirect, Route, RouteComponentProps, Switch} from 'react-router';
import {UsersOverview} from '../menu';
import {UsersNamespaces} from './namespaces/namespaces-list';
import {UsersList} from './users-list/users-list';

export const UsersContainer = (props: RouteComponentProps<any>) => (
    <div className='argo-container'>
        <Switch>
            <Route exact={true} path={`${props.match.path}`} component={UsersOverview} />
            <Route exact={true} path={`${props.match.path}/list`} component={UsersList} />
            <Route exact={true} path={`${props.match.path}/namespaces`} component={UsersNamespaces} />
            <Redirect path='*' to={`${props.match.path}`} />
        </Switch>
    </div>
);