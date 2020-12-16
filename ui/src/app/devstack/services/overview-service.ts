import axios from 'axios';
import {endpoint} from '../../devstack/classes/constants';
const accessToken = localStorage.getItem('accessToken');
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class OverviewService {
    public async get(): Promise<any> {
        const response = await axios.get(`${endpoint}/argo/overview-data`, { headers });
        return response.data;
    }
    public async getByNamespace(namespace: string): Promise<any> {
        const response = await axios.get(`${endpoint}/argo/overview-data/${namespace}`, { headers });
        return response.data;
    }
    public async getWorkflows(): Promise<any> {
        const response = await axios.get(`${endpoint}/argo/overview-workflows`, { headers });
        return response.data;
    }
    public async getWorkflowsByNamespace(namespace: string): Promise<any> {
        const response = await axios.get(`${endpoint}/argo/overview-workflows/${namespace}`, { headers });
        return response.data;
    }
}
