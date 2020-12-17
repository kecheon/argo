import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Subscription} from 'rxjs';

import {Page, SlidingPanel} from 'argo-ui';
import {labels} from '../../../../../models';
import {uiUrl} from '../../../../shared/base';
import {Consumer} from '../../../../shared/context';

import {BasePage} from '../../../../shared/components/base-page';
import {Loading} from '../../../../shared/components/loading';
import {ZeroState} from '../../../../shared/components/zero-state';
import {Utils} from '../../../../shared/utils';
import * as Actions from './components/user-operations-map';

import {CostOptimisationNudge} from '../../../../shared/components/cost-optimisation-nudge';
import {ErrorNotice} from '../../../../shared/components/error-notice';
import {PaginationPanel} from '../../../../shared/components/pagination-panel';
import {Pagination, parseLimit} from '../../../../shared/pagination';
import {WorkflowsRow} from './components/workflows-row/workflows-row';
// import {WorkflowsToolbar} from './components/workflows-toolbar/workflows-toolbar';

// import CreateUser from './components/create-namespace/create-namespace';
import { RolesService } from '../../../services/roles-service';
import {Role} from '../models';

require('./workflows-list.scss');

interface State {
    namespace: string;
    pagination: Pagination;
    selectedPhases: string[];
    selectedLabels: string[];
    selectedWorkflows: Map<string, Role>;
    roles?: Role[];
    error?: Error;
    batchActionDisabled: Actions.OperationDisabled;
}

interface WorkflowListRenderOptions {
    paginationLimit: number;
    selectedPhases: string[];
}

const allBatchActionsEnabled: Actions.OperationDisabled = {
    DELETE: false
};
// const userService = new UserService();
const rolesService = new RolesService();
const LOCAL_STORAGE_KEY = 'ListOptions';

export class UsersRoles extends BasePage<RouteComponentProps<any>, State> {
    private get wfInput() {
        return Utils.tryJsonParse(this.queryParam('new'));
    }

    private get filterParams() {
        const params = new URLSearchParams();
        this.state.selectedPhases.forEach(phase => {
            params.append('phase', phase);
        });
        this.state.selectedLabels.forEach(label => {
            params.append('label', label);
        });
        if (this.state.pagination.offset) {
            params.append('offset', this.state.pagination.offset);
        }
        if (this.state.pagination.limit) {
            params.append('limit', this.state.pagination.limit.toString());
        }
        return params;
    }

    private get options() {
        const options: WorkflowListRenderOptions = {} as WorkflowListRenderOptions;
        options.selectedPhases = this.state.selectedPhases;
        if (this.state.pagination.limit) {
            options.paginationLimit = this.state.pagination.limit;
        }
        return options;
    }

    private static saveOptions(newChanges: WorkflowListRenderOptions) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newChanges));
    }

    private static getOptions(): WorkflowListRenderOptions {
        if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
            return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) as WorkflowListRenderOptions;
        }
        return {
            paginationLimit: 0,
            selectedPhases: []
        } as WorkflowListRenderOptions;
    }

    private subscription: Subscription;

    constructor(props: RouteComponentProps<any>, context: any) {
        super(props, context);
        const savedOptions = UsersRoles.getOptions();
        this.state = {
            pagination: {
                offset: this.queryParam('offset'),
                limit: parseLimit(this.queryParam('limit')) || savedOptions.paginationLimit
            },
            namespace: this.props.match.params.namespace || '',
            selectedPhases: this.queryParams('phase').length > 0 ? this.queryParams('phase') : savedOptions.selectedPhases,
            selectedLabels: this.queryParams('label'),
            selectedWorkflows: new Map<string, Role>(),
            batchActionDisabled: {...allBatchActionsEnabled}
        };
    }

    public componentDidMount(): void {
        this.setState({selectedWorkflows: new Map<string, Role>()}, () => {
            this.reloadWorkflows();
        });
    }

    public componentWillUnmount(): void {
        this.setState({selectedWorkflows: new Map<string, Role>()});
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public render() {
        return (
            <Consumer>
                {ctx => (
                    <Page
                        title='Users Roles'
                        toolbar={{
                            breadcrumbs: [{title: 'Users Roles', path: uiUrl('users/roles')}],
                            actionMenu: {
                                items: [
                                    // {
                                    //     title: 'Create New Role',
                                    //     iconClassName: 'fa fa-plus',
                                    //     disabled: ctx.currentUser.role.level > 0,
                                    //     action: () => ctx.navigation.goto('.', {new: '{}'})
                                    // }
                                ]
                            },
                            tools: []
                        }}>
                        {/* {(ctx.currentUser.role.level < 3) && <WorkflowsToolbar
                            selectedWorkflows={this.state.selectedWorkflows}
                            clearSelection={() => this.setState({selectedWorkflows: new Map<string, Role>()})}
                            loadWorkflows={() => {
                                this.setState({selectedWorkflows: new Map<string, Role>()});
                                this.changeFilters(this.state.namespace, this.state.selectedPhases, this.state.selectedLabels, {limit: this.state.pagination.limit});
                            }}
                            isDisabled={this.state.batchActionDisabled}
                        />} */}
                        <div className='row'>
                            {/* <div className='columns small-12 xlarge-2'>
                                <div>{this.renderQuery(ctx)}</div>
                                <div>
                                    <WorkflowFilters
                                        workflows={this.state.workflows || []}
                                        namespace={this.state.namespace}
                                        phaseItems={Object.values(models.NODE_PHASE)}
                                        selectedPhases={this.state.selectedPhases}
                                        selectedLabels={this.state.selectedLabels}
                                        onChange={(namespace, selectedPhases, selectedLabels) =>
                                            this.changeFilters(namespace, selectedPhases, selectedLabels, {limit: this.state.pagination.limit})
                                        }
                                    />
                                </div>
                            </div> */}
                            <div className='columns small-12 xlarge-10'>{this.renderNamespaces()}</div>
                        </div>
                        <SlidingPanel isShown={!!this.wfInput} onClose={() => ctx.navigation.goto('.', {new: null})}>
                            {/* <ResourceEditor
                                title='Create new user'
                                kind='Workflow'
                                upload={true}
                                editing={true}
                                namespace={this.state.namespace || 'default'}
                                value={exampleWorkflow()}
                                onSubmit={wfValue =>
                                    services.workflows
                                        .create(wfValue, wfValue.metadata.namespace || this.state.namespace)
                                        .then(wf => ctx.navigation.goto(uiUrl(`workflows/${wf.metadata.namespace}/${wf.metadata.name}`)))
                                }
                            /> */}
                        </SlidingPanel>
                    </Page>
                )}
            </Consumer>
        );
    }

    private reloadWorkflows() {
        this.fetchRoles(this.state.namespace, this.state.selectedPhases, this.state.selectedLabels, this.state.pagination);
    }

    private fetchRoles(namespace: string, selectedPhases: string[], selectedLabels: string[], pagination: Pagination): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        rolesService
            .get()
            .then((roles: any) => {
                this.setState(
                    {
                        error: null,
                        roles: roles || [],
                        pagination: {offset: pagination.offset, limit: pagination.limit, nextOffset: 'wfList.metadata.continue'},
                        selectedPhases,
                        selectedLabels,
                        selectedWorkflows: new Map<string, Role>()
                    },
                    this.saveHistory
                );
                return roles;
            })
            .then((_: any) => this.setState({error: null}))
            .catch((error: any) => this.setState({error}));
    }

    private changeFilters(namespace: string, selectedPhases: string[], selectedLabels: string[], pagination: Pagination) {
        this.fetchRoles(namespace, selectedPhases, selectedLabels, pagination);
    }

    private saveHistory() {
        UsersRoles.saveOptions(this.options);
        this.url = uiUrl('users/roles' + this.state.namespace || '' + '?' + this.filterParams.toString());
        Utils.setCurrentNamespace(this.state.namespace);
    }

    private countsByCompleted() {
        const counts = {complete: 0, incomplete: 0};
        this.state.roles.forEach((wf: any) => {
            // if (wf.metadata.labels && wf.metadata.labels[labels.completed] === 'true') {
                counts.complete++;
                console.log(labels.completed);
            // } else {
            //     counts.incomplete++;
            // }
        });
        return counts;
    }

    private renderNamespaces() {
        if (this.state.error) {
            return <ErrorNotice error={this.state.error} onReload={() => this.reloadWorkflows()} reloadAfterSeconds={10} />;
        }
        if (!this.state.roles) {
            return <Loading />;
        }
        if (this.state.roles.length === 0) {
            return (
                <ZeroState title='No roles'>
                    <p>To create a new role, use the button above.</p>
                </ZeroState>
            );
        }

        const counts = this.countsByCompleted();

        return (
            <>
                {(counts.complete > 100 || counts.incomplete > 100) && (
                    <CostOptimisationNudge name='workflow-list'>
                        You have at least {counts.incomplete} incomplete, and {counts.complete} complete workflows. Reducing these amounts will reduce your costs.
                    </CostOptimisationNudge>
                )}
                <div className='argo-table-list'>
                    <div className='row argo-table-list__head'>
                        <div className='columns workflows-list__status small-1' />
                        <div className='row small-11'>
                            <div className='columns small-6'>NAME</div>
                            <div className='columns small-6'>ID</div>
                        </div>
                    </div>
                    {this.state.roles.map(namespace => {
                        return (
                            <WorkflowsRow
                                role={namespace}
                                key={namespace.id}
                                checked={this.state.selectedWorkflows.has(namespace.id)}
                                onChange={(key: any) => {
                                    const value = `${key}=${namespace.id}`;
                                    let newTags: string[] = [];
                                    if (this.state.selectedLabels.indexOf(value) === -1) {
                                        newTags = this.state.selectedLabels.concat(value);
                                        this.setState({selectedLabels: newTags});
                                    }
                                    this.changeFilters(this.state.namespace, this.state.selectedPhases, newTags, this.state.pagination);
                                }}
                                select={(subNamespace: Role) => {
                                    const namespaceUID = subNamespace.id;
                                    if (!namespaceUID) {
                                        return;
                                    }
                                    const currentlySelected: Map<string, Role> = this.state.selectedWorkflows;
                                    if (!currentlySelected.has(namespaceUID)) {
                                        currentlySelected.set(namespaceUID, subNamespace);
                                    } else {
                                        currentlySelected.delete(namespaceUID);
                                    }
                                    this.updateCurrentlySelectedAndBatchActions(currentlySelected);
                                }}
                            />
                        );
                    })}
                </div>
                <PaginationPanel
                    onChange={pagination => this.changeFilters(this.state.namespace, this.state.selectedPhases, this.state.selectedLabels, pagination)}
                    pagination={this.state.pagination}
                />
            </>
        );
    }

    private updateCurrentlySelectedAndBatchActions(newSelectedWorkflows: Map<string, Role>): void {
        const actions: any = Actions.WorkflowOperationsMap;
        const nowDisabled: any = {...allBatchActionsEnabled};
        for (const action of Object.keys(nowDisabled)) {
            for (const wf of Array.from(newSelectedWorkflows.values())) {
                nowDisabled[action] = nowDisabled[action] || actions[action].disabled(wf);
            }
        }
        this.setState({batchActionDisabled: nowDisabled, selectedWorkflows: new Map<string, Role>(newSelectedWorkflows)});
    }
}
