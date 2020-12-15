import axios from 'axios';
import {endpoint} from '../classes/constants';
const accessToken = localStorage.getItem('accessToken');
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class MeteringService {
    public async get(start: any, end: any): Promise<any> {
        // const start = startDate.toString();
        // const end = endDate.toString();
        const params = { start, end };
        const response = await axios.get(`${endpoint}/argo/metering`, { params, headers });
        console.log(response);
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
}
