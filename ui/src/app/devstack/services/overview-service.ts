import axios from 'axios';
import {endpoint} from '../../devstack/classes/constants';
const accessToken = localStorage.getItem('accessToken');
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class OverviewService {
    public async get(namespace: string): Promise<any> {
        const response = await axios.get(`${endpoint}/argo/overview/${namespace}/overview_data`, { headers });
        console.log(response);
        return response.data;
    }
}
