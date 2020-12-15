import axios from 'axios';
import {endpoint} from '../classes/constants';
const accessToken = localStorage.getItem('accessToken');
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class MeteringService {
    public async get(minStartedAt: any, maxStartedAt: any): Promise<any> {
        // const start = startDate.toString();
        // const end = endDate.toString();
        const params = { minStartedAt, maxStartedAt };
        const response = await axios.get(`${endpoint}/argo/metering`, { params, headers });
        console.log(response);
        return response.data;
    }
    public async getByNamespace(namespace: string, minStartedAt: any, maxStartedAt: any): Promise<any> {
        const params = { minStartedAt, maxStartedAt };
        const response = await axios.get(`${endpoint}/argo/metering/${namespace}`, { params, headers });
        return response.data;
    }
    public async getWorkflows(): Promise<any> {
        const response = await axios.get(`${endpoint}/argo/overview-workflows`, { headers });
        return response.data;
    }
}
