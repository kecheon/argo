import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Subscription} from 'rxjs';

// import {Autocomplete, Page, SlidingPanel} from 'argo-ui';
import {Page, SlidingPanel} from 'argo-ui';
// import * as models from '../../../../../models';
import {labels, Workflow} from '../../../../../models';
import {uiUrl} from '../../../../shared/base';
import {Consumer} from '../../../../shared/context';
// import {services} from '../../../../shared/services';

import {BasePage} from '../../../../shared/components/base-page';
import {Loading} from '../../../../shared/components/loading';
// import {Query} from '../../../../shared/components/query';
import {ZeroState} from '../../../../shared/components/zero-state';
// import {exampleWorkflow} from '../../../../shared/examples';
import {Utils} from '../../../../shared/utils';
import * as Actions from './components/user-operations-map';

import {CostOptimisationNudge} from '../../../../shared/components/cost-optimisation-nudge';
import {ErrorNotice} from '../../../../shared/components/error-notice';
import {PaginationPanel} from '../../../../shared/components/pagination-panel';
// import {ResourceEditor} from '../../../../shared/components/resource-editor/resource-editor';
import {Pagination, parseLimit} from '../../../../shared/pagination';
// import {WorkflowFilters} from '../workflow-filters/workflow-filters';
import {ClustersRow} from './components/clusters-row/clusters-row';
import {WorkflowsToolbar} from './components/workflows-toolbar/workflows-toolbar';

import {ClusterService} from '../../../services/cluster-service';
import {Cluster} from '../models';
import CreateUser from './components/create-cluster/create-cluster';

require('./workflows-list.scss');

interface State {
    namespace: string;
    pagination: Pagination;
    selectedPhases: string[];
    selectedLabels: string[];
    selectedWorkflows: Map<string, Cluster>;
    workflows?: Workflow[];
    users?: Cluster[];
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
const service = new ClusterService();
const LOCAL_STORAGE_KEY = 'ListOptions';

export class ClustersList extends BasePage<RouteComponentProps<any>, State> {
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
        const savedOptions = ClustersList.getOptions();
        this.state = {
            pagination: {
                offset: this.queryParam('offset'),
                limit: parseLimit(this.queryParam('limit')) || savedOptions.paginationLimit
            },
            namespace: this.props.match.params.namespace || '',
            selectedPhases: this.queryParams('phase').length > 0 ? this.queryParams('phase') : savedOptions.selectedPhases,
            selectedLabels: this.queryParams('label'),
            selectedWorkflows: new Map<string, Cluster>(),
            batchActionDisabled: {...allBatchActionsEnabled}
        };
    }

    public componentDidMount(): void {
        this.setState({selectedWorkflows: new Map<string, Cluster>()}, () => {
            this.reloadUserList();
        });
    }

    public componentWillUnmount(): void {
        this.setState({selectedWorkflows: new Map<string, Cluster>()});
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public render() {
        return (
            <Consumer>
                {ctx => (
                    <Page
                        title='Clusters list'
                        toolbar={{
                            breadcrumbs: [{title: 'Clusters list', path: uiUrl('users/cluster')}],
                            actionMenu: {
                                items: [
                                    {
                                        title: 'Create New Cluster',
                                        iconClassName: 'fa fa-plus',
                                        disabled: ctx.currentUser.role.level > 1,
                                        action: () => ctx.navigation.goto('.', {new: '{}'})
                                    }
                                ]
                            },
                            tools: []
                        }}>
                        {(ctx.currentUser.role.level < 3) && <WorkflowsToolbar
                            selectedWorkflows={this.state.selectedWorkflows}
                            clearSelection={() => this.setState({selectedWorkflows: new Map<string, Cluster>()})}
                            loadWorkflows={() => {
                                this.setState({selectedWorkflows: new Map<string, Cluster>()});
                                this.changeFilters(this.state.namespace, this.state.selectedPhases, this.state.selectedLabels, {limit: this.state.pagination.limit});
                            }}
                            isDisabled={this.state.batchActionDisabled}
                        />}
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
                            <div className='columns small-12 xlarge-10'>{this.renderUsers()}</div>
                        </div>
                        <SlidingPanel isShown={!!this.wfInput} onClose={() => ctx.navigation.goto('.', {new: null})}>
                            <CreateUser />
                        </SlidingPanel>
                    </Page>
                )}
            </Consumer>
        );
    }

    private reloadUserList() {
        this.fetchUsers(this.state.namespace, this.state.selectedPhases, this.state.selectedLabels, this.state.pagination);
    }

    private fetchUsers(namespace: string, selectedPhases: string[], selectedLabels: string[], pagination: Pagination): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        service
            .get()
            .then(clustersList => {
                this.setState(
                    {
                        error: null,
                        namespace,
                        users: clustersList || [],
                        pagination: {offset: pagination.offset, limit: pagination.limit, nextOffset: 'wfList.metadata.continue'},
                        selectedPhases,
                        selectedLabels,
                        selectedWorkflows: new Map<string, Cluster>()
                    },
                    this.saveHistory
                );
                return clustersList;
            })
            .then(_ => this.setState({error: null}))
            .catch(error => this.setState({error}));
    }

    private changeFilters(namespace: string, selectedPhases: string[], selectedLabels: string[], pagination: Pagination) {
        this.fetchUsers(namespace, selectedPhases, selectedLabels, pagination);
    }

    private saveHistory() {
        ClustersList.saveOptions(this.options);
        this.url = uiUrl('users/cluster' + this.state.namespace || '' + '?' + this.filterParams.toString());
        Utils.setCurrentNamespace(this.state.namespace);
    }

    private countsByCompleted() {
        const counts = {complete: 0, incomplete: 0};
        this.state.users.forEach(wf => {
            // if (wf.metadata.labels && wf.metadata.labels[labels.completed] === 'true') {
                counts.complete++;
                console.log(labels.completed);
            // } else {
            //     counts.incomplete++;
            // }
        });
        return counts;
    }

    private renderUsers() {
        if (this.state.error) {
            return <ErrorNotice error={this.state.error} onReload={() => this.reloadUserList()} reloadAfterSeconds={10} />;
        }
        if (!this.state.users) {
            return <Loading />;
        }
        if (this.state.users.length === 0) {
            return (
                <ZeroState title='No users'>
                    <p>To create a new user, use the button above.</p>
                </ZeroState>
            );
        }
        console.log(this.state.users);

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
                            <div className='columns small-2'>ID</div>
                            <div className='columns small-1'>NAME</div>
                            <div className='columns small-2'>DOMAIN ID</div>
                            <div className='columns small-2'>DESCRIPTION</div>
                            <div className='columns small-1'>ENABLED</div>
                            <div className='columns small-2'>PARENT ID</div>
                            <div className='columns small-1'>IS_DOMAIN</div>
                            <div className='columns small-1'>EDIT</div>
                        </div>
                    </div>
                    {this.state.users.map(user => {
                        return (
                            // ((user.is_wf) &&
                            ( true &&
                                <ClustersRow
                                    user={user}
                                    key={user.id}
                                    checked={this.state.selectedWorkflows.has(user.id)}
                                    onChange={key => {
                                        const value = `${key}=${user.id}`;
                                        let newTags: string[] = [];
                                        if (this.state.selectedLabels.indexOf(value) === -1) {
                                            newTags = this.state.selectedLabels.concat(value);
                                            this.setState({selectedLabels: newTags});
                                        }
                                        this.changeFilters(this.state.namespace, this.state.selectedPhases, newTags, this.state.pagination);
                                    }}
                                    select={subUser => {
                                        const userUID = subUser.id;
                                        if (!userUID) {
                                            return;
                                        }
                                        const currentlySelected: Map<string, Cluster> = this.state.selectedWorkflows;
                                        if (!currentlySelected.has(userUID)) {
                                            currentlySelected.set(userUID, subUser);
                                        } else {
                                            currentlySelected.delete(userUID);
                                        }
                                        this.updateCurrentlySelectedAndBatchActions(currentlySelected);
                                    }}
                                />
                            )
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

    private updateCurrentlySelectedAndBatchActions(newSelectedWorkflows: Map<string, Cluster>): void {
        const actions: any = Actions.WorkflowOperationsMap;
        const nowDisabled: any = {...allBatchActionsEnabled};
        for (const action of Object.keys(nowDisabled)) {
            for (const wf of Array.from(newSelectedWorkflows.values())) {
                nowDisabled[action] = nowDisabled[action] || actions[action].disabled(wf);
            }
        }
        this.setState({batchActionDisabled: nowDisabled, selectedWorkflows: new Map<string, Cluster>(newSelectedWorkflows)});
    }
}