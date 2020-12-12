import axios from 'axios';
const gatewayEndpoint = 'http://localhost:3000';
const accessToken = localStorage.getItem('accessToken');
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class ClusterService {
    public async get(): Promise<any> {
        try {
            const response = await axios.get(`${gatewayEndpoint}/cluster`, { headers });
            console.log(response);
            return response.data;
        } catch(err) {
            console.log(err);
            return []
        }
    }
}
