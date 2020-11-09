import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserHistory} from 'history';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router';

import {Layout, NavigationManager, Notifications, NotificationsManager, Popup, PopupManager, PopupProps} from 'argo-ui';
import {uiUrl} from './shared/base';
import {ContextApis, Provider} from './shared/context';

import {NotificationType} from 'argo-ui/src/index';
import {Version} from '../models';
import apidocs from './apidocs';
import archivedWorkflows from './archived-workflows';
import clusterWorkflowTemplates from './cluster-workflow-templates';
import cronWorkflows from './cron-workflows';
// import { UserStateProvider } from './devstack/classes/user-service-provider';
import help from './help';
import reports from './reports';
import ErrorBoundary from './shared/components/error-boundary';
import {services} from './shared/services';
import {Utils} from './shared/utils';
// import userinfo from './userinfo';
import workflowTemplates from './workflow-templates';
import workflows from './workflows';

import { UserState } from './devstack/classes/current-user';
import login from './devstack/login';
import logout from './devstack/logout';
import register from './devstack/register';
import userinfo from './devstack/userinfo';
import {navItems} from './devstack/classes/constants';
import users from './devstack/users';
import {UsersList} from './devstack/users/components/users-list/users-list';
import {UsersNamespaces} from './devstack/users/components/namespaces/namespaces-list';
import {UsersRoles} from './devstack/users/components/roles/roles-list';
import overview from './devstack/overview';

const workflowsUrl = uiUrl('workflows');
const workflowTemplatesUrl = uiUrl('workflow-templates');
const clusterWorkflowTemplatesUrl = uiUrl('cluster-workflow-templates');
const cronWorkflowsUrl = uiUrl('cron-workflows');
const archivedWorkflowsUrl = uiUrl('archived-workflows');
const helpUrl = uiUrl('help');
const apiDocsUrl = uiUrl('apidocs');
const userInfoUrl = uiUrl('userinfo');
const loginUrl = uiUrl('login');
const logoutUrl = uiUrl('logout');
const registerUrl = uiUrl('register');
const timelineUrl = uiUrl('timeline');
const reportsUrl = uiUrl('reports');
const usersUrl = uiUrl('users');
const usersListUrl = uiUrl('users/list');
const usersNamespacesUrl = uiUrl('users/namespaces');
const usersRolesUrl = uiUrl('users/roles');
const overviewUrl = uiUrl('overview')

export const history = createBrowserHistory();

export class App extends React.Component<{}, {version?: Version; popupProps: PopupProps; namespace?: string;}> {

    private get archivedWorkflowsUrl() {
        return archivedWorkflowsUrl + '/' + (this.state.namespace || '');
    }

    private get cronWorkflowsUrl() {
        return cronWorkflowsUrl + '/' + (this.state.namespace || '');
    }

    private get workflowTemplatesUrl() {
        return workflowTemplatesUrl + '/' + (this.state.namespace || '');
    }

    private get workflowsUrl() {
        return workflowsUrl + '/' + (this.state.namespace || '');
    }

    private get reportsUrl() {
        return reportsUrl + '/' + (this.state.namespace || '');
    }
    public static childContextTypes = {
        history: PropTypes.object,
        apis: PropTypes.object
    }
    public currentUser: UserState;
    public navItems = navItems.user;

    private popupManager: PopupManager;
    private notificationsManager: NotificationsManager;
    private navigationManager: NavigationManager;
    // private userManager: CurrentUser;

    constructor(props: {}) {
        super(props);
        this.state = {popupProps: null};
        this.popupManager = new PopupManager();
        this.notificationsManager = new NotificationsManager();
        this.navigationManager = new NavigationManager(history);
        Utils.onNamespaceChange = namespace => {
            this.setState({namespace});
        };
        this.currentUser = {isLoggedIn: false, username: '', role: {name: '', level: 4}, accessToken: ''};
    }

    public componentDidMount() {
        this.popupManager.popupProps.subscribe(popupProps => this.setState({popupProps}));
        services.info
            .getVersion()
            .then(version => this.setState({version}))
            .then(() => services.info.getInfo())
            .then(info => this.setState({namespace: info.managedNamespace || Utils.getCurrentNamespace() || ''}))
            .catch(error => {
                this.notificationsManager.show({
                    content: 'Failed to load ' + error,
                    type: NotificationType.Error
                });
            });
        const loggedInUser = localStorage.getItem('user');

        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            this.currentUser = foundUser;
            this.navItems = navItems.loggedInUser.concat(this.navItems);
            if (this.currentUser.role.level <= 1) {
                this.navItems = this.navItems.concat(navItems.tadmin);
            }
            if (this.currentUser.role.level <= 0) {
                this.navItems = navItems.admin2.concat(this.navItems).concat(navItems.admin);
            }
        } else {
            this.navItems = navItems.anonymousUser.concat(this.navItems);
        }
    }

    public render() {
        const providerContext: ContextApis = {
            notifications: this.notificationsManager,
            popup: this.popupManager,
            navigation: this.navigationManager,
            currentUser: this.currentUser,
            history,
        };
        return (
            <Provider value={providerContext}>
                {this.state.popupProps && <Popup {...this.state.popupProps} />}
                    <Router history={history}>
                        <Layout navItems={this.navItems} version={() => <>{this.state.version ? this.state.version.version : 'unknown'}</>}>
                            <Notifications notifications={this.notificationsManager.notifications} />
                            <ErrorBoundary>
                                <Switch>
                                    <Route exact={true} strict={true} path={uiUrl('')}>
                                        <Redirect to={workflowsUrl} />
                                    </Route>
                                    <Route exact={true} strict={true} path={timelineUrl}>
                                        <Redirect to={workflowsUrl} />
                                    </Route>
                                    {this.state.namespace && (
                                        <Route exact={true} strict={true} path={workflowsUrl}>
                                            <Redirect to={this.workflowsUrl} />
                                        </Route>
                                    )}
                                    {this.state.namespace && (
                                        <Route exact={true} strict={true} path={workflowTemplatesUrl}>
                                            <Redirect to={this.workflowTemplatesUrl} />
                                        </Route>
                                    )}
                                    {this.state.namespace && (
                                        <Route exact={true} strict={true} path={cronWorkflowsUrl}>
                                            <Redirect to={this.cronWorkflowsUrl} />
                                        </Route>
                                    )}
                                    {this.state.namespace && (
                                        <Route exact={true} strict={true} path={archivedWorkflowsUrl}>
                                            <Redirect to={this.archivedWorkflowsUrl} />
                                        </Route>
                                    )}
                                    {this.state.namespace && (
                                        <Route exact={true} strict={true} path={reportsUrl}>
                                            <Redirect to={this.reportsUrl} />
                                        </Route>
                                    )}
                                    <Route path={workflowsUrl} component={workflows.component} />
                                    <Route path={workflowTemplatesUrl} component={workflowTemplates.component} />
                                    <Route path={clusterWorkflowTemplatesUrl} component={clusterWorkflowTemplates.component} />
                                    <Route path={cronWorkflowsUrl} component={cronWorkflows.component} />
                                    <Route path={archivedWorkflowsUrl} component={archivedWorkflows.component} />
                                    <Route path={reportsUrl} component={reports.component} />
                                    <Route exact={true} strict={true} path={helpUrl} component={help.component} />
                                    <Route exact={true} strict={true} path={apiDocsUrl} component={apidocs.component} />
                                    <Route exact={true} strict={true} path={userInfoUrl} component={userinfo.component} />
                                    <Route exact={true} strict={true} path={loginUrl} component={login.component} />
                                    <Route exact={true} strict={true} path={registerUrl} component={register.component} />
                                    <Route exact={true} strict={true} path={logoutUrl} component={logout.component} />
                                    <Route exact={true} strict={true} path={usersNamespacesUrl} component={UsersNamespaces} />
                                    <Route exact={true} strict={true} path={usersListUrl} component={UsersList} />
                                    <Route exact={true} strict={true} path={usersRolesUrl} component={UsersRoles} />
                                    <Route exact={true} strict={true} path={usersUrl} component={users.component} />
                                    <Route exact={true} strict={true} path={overviewUrl} component={overview.component} />
                                </Switch>
                            </ErrorBoundary>
                        </Layout>
                    </Router>
            </Provider>
        );
    }

    public getChildContext() {
        return {
            history,
            apis: {
                popup: this.popupManager,
                notifications: this.notificationsManager
            }
        };
    }
}
