import axios from 'axios';
const accessToken = localStorage.getItem('accessToken');
import {endpoint} from '../../devstack/classes/constants';
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class ClusterService {
    public async get(): Promise<any> {
        try {
            const response = await axios.get(`${endpoint}/cluster`, { headers });
            return response.data;
        } catch(err) {
            return []
        }
    }
    public async getDetail(id: string): Promise<any> {
        try {
            const response = await axios.get(`${endpoint}/cluster/${id}`, { headers });
            return response.data;
        } catch(err) {
            return []
        }
    }
}
