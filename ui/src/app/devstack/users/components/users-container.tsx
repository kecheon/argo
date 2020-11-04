import * as React from 'react';
import {Redirect, Route, RouteComponentProps, Switch} from 'react-router';
import {UsersOverview} from './menu';

export const UsersContainer = (props: RouteComponentProps<any>) => (
    <div className='argo-container'>
        <Switch>
            <Route exact={true} path={`${props.match.path}`} component={UsersOverview} />
            <Redirect path='*' to={`${props.match.path}`} />
        </Switch>
    </div>
);