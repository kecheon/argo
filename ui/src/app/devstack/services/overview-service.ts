import axios from 'axios';
const gatewayEndpoint = 'http://localhost:3000';
const accessToken = localStorage.getItem('accessToken');
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class OverviewService {
    public async get(namespace: string): Promise<any> {
        const response = await axios.get(`${gatewayEndpoint}/api/v1/overview/${namespace}/overview_data`, { headers });
        console.log(response);
        return response.data;
    }
}
