import {AppContext as ArgoAppContext, NavigationApi, NotificationsApi, PopupApi} from 'argo-ui';
import {History} from 'history';
import * as React from 'react';
import CurrentUser from '../devstack/classes/current-user';

export type AppContext = ArgoAppContext & {apis: {popup: PopupApi; notifications: NotificationsApi; navigation: NavigationApi; baseHref: string, currentUser: CurrentUser}};

export interface ContextApis {
    popup: PopupApi;
    notifications: NotificationsApi;
    navigation: NavigationApi;
    history: History;
    currentUser: CurrentUser;
}

export const {Provider, Consumer} = React.createContext<ContextApis>(null);
