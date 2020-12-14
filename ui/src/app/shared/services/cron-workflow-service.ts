import {CronWorkflow, CronWorkflowList} from '../../../models';
import requests from './requests';

export class CronWorkflowService {
    public create(cronWorkflow: CronWorkflow, namespace: string) {
        return requests
            .post(`argo/cron-workflows/${namespace}`)
            .send({cronWorkflow})
            .then(res => res.body as CronWorkflow);
    }

    public list(namespace: string) {
        return requests
            .get(`argo/cron-workflows/${namespace}`)
            .then(res => res.body as CronWorkflowList)
            .then(list => list.items || []);
    }

    public get(name: string, namespace: string) {
        return requests.get(`argo/cron-workflows/${namespace}/${name}`).then(res => res.body as CronWorkflow);
    }

    public update(cronWorkflow: CronWorkflow, name: string, namespace: string) {
        return requests
            .put(`argo/cron-workflows/${namespace}/${name}`)
            .send({cronWorkflow})
            .then(res => res.body as CronWorkflow);
    }

    public delete(name: string, namespace: string) {
        return requests.delete(`argo/cron-workflows/${namespace}/${name}`);
    }
}
