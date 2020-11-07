import {Workflow} from '../../../../../../models';
import {UserService} from '../../../../services/user-service';
// import {Utils} from '../../../shared/utils';

const service = new UserService();

export type OperationDisabled = {
    [action in WorkflowOperationName]: boolean;
};

export type WorkflowOperationName = 'DELETE';

export interface WorkflowOperation {
    title: WorkflowOperationName;
    action: WorkflowOperationAction;
    iconClassName: string;
    disabled: (wf: Workflow) => boolean;
}

export type WorkflowOperationAction = (wf: Workflow) => Promise<any>;

export interface WorkflowOperations {
    [name: string]: WorkflowOperation;
}

export const WorkflowOperationsMap: WorkflowOperations = {
    // RETRY: {
    //     title: 'RETRY',
    //     iconClassName: 'fa fa-undo',
    //     disabled: (wf: Workflow) => {
    //         const workflowPhase: NodePhase = wf && wf.status ? wf.status.phase : undefined;
    //         return workflowPhase === undefined || !(workflowPhase === 'Failed' || workflowPhase === 'Error');
    //     },
    //     action: (wf: Workflow) => services.workflows.retry(wf.metadata.name, wf.metadata.namespace)
    // },
    // RESUBMIT: {
    //     title: 'RESUBMIT',
    //     iconClassName: 'fa fa-plus-circle',
    //     disabled: () => false,
    //     action: (wf: Workflow) => services.workflows.resubmit(wf.metadata.name, wf.metadata.namespace)
    // },
    // SUSPEND: {
    //     title: 'SUSPEND',
    //     iconClassName: 'fa fa-pause',
    //     disabled: (wf: Workflow) => !Utils.isWorkflowRunning(wf) || Utils.isWorkflowSuspended(wf),
    //     action: (wf: Workflow) => services.workflows.suspend(wf.metadata.name, wf.metadata.namespace)
    // },
    // RESUME: {
    //     title: 'RESUME',
    //     iconClassName: 'fa fa-play',
    //     disabled: (wf: Workflow) => !Utils.isWorkflowSuspended(wf),
    //     action: (wf: Workflow) => services.workflows.resume(wf.metadata.name, wf.metadata.namespace)
    // },
    // STOP: {
    //     title: 'STOP',
    //     iconClassName: 'fa fa-stop-circle',
    //     disabled: (wf: Workflow) => !Utils.isWorkflowRunning(wf),
    //     action: (wf: Workflow) => services.workflows.stop(wf.metadata.name, wf.metadata.namespace)
    // },
    // EDIT: {
    //     title: 'EDIT',
    //     iconClassName: 'fa fa-edit',
    //     disabled: () => false,
    //     action: (wf: Workflow) => service.getProfile('link')
    // },
    DELETE: {
        title: 'DELETE',
        iconClassName: 'fa fa-trash',
        disabled: () => false,
        action: (wf: Workflow) => service.delete('user id')
    }
};
