import axios from 'axios';
import namespacesList from './__mocks__/namespaces';
// import { UsersList } from '../users/components/users-list/users-list';
import {endpoint} from '../../devstack/classes/constants';
// const keystoneEndPoint = 'http://183.111.177.141/identity/v3';
import {NamespaceForm} from '../users/components/namespaces/components/create-namespace/create-namespace';
const accessToken = localStorage.getItem('accessToken');
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class NamespaceService {
    public async get(): Promise<any> {
        // get projects list if wf-admin

        const response = await axios.get(`${endpoint}/namespace`, { headers });
        return response.data;
    }
    public async delete(id: string): Promise<any> {
        const response = await axios.delete(`${endpoint}/namespace/${id}`, { headers });
        return { status: 'success', message: 'namespace deleted' }
    }
    public async create(data: NamespaceForm): Promise<any> {
        const response = await axios.post(`${endpoint}/namespace`, data, { headers });
        return { status: 'success', message: 'namespace created' }
    }
    public async update(data: NamespaceForm): Promise<any> {
        const response = await axios.put(`${endpoint}/namespace`, data, { headers });
        return { status: 'success', message: 'namespace created' }
    }
    public async getProfile(id: string): Promise<any> {
        const response = await axios.get(`${endpoint}/namespace/${id}`, { headers });
        // return {
        //     'is_wf': true,
        //     'wf': {
        //         'k8s_ns': 'dl-inferencing',
        //         'quota_cpu': 10,
        //         'quota_ram': 16
        //     },
        //     'id': '978a647141a04db2a28c19eba924f6c0',
        //     'name': 'dl-inferencing',
        //     'domain_id': 'default',
        //     'description': 'inference',
        //     'enabled': true,
        //     'parent_id': 'default',
        //     'is_domain': false,
        //     'tags': [],
        //     'options': {},
        //     'links': {
        //         'self': 'http://183.111.177.141/identity/v3/projects/978a647141a04db2a28c19eba924f6c0'
        //     }
        // };
        return response.data;
    }
    public async getMembers(id: string): Promise<any> {
        const response = await axios.get(`${endpoint}/namespace/${id}/member`, { headers });
        console.log(response);
        return response.data;
    }

    public async updateMember(id: string, data: any): Promise<any> {
        const response = await axios.patch(`${endpoint}/namespace/${id}/member`, data, { headers });
        console.log(response);
        return response;
    }

    public async updateNamespace(namespace: string, namespaceId: string, data: any): Promise<any> {
        const response = await axios.patch(`${endpoint}/namespace/${namespaceId}`, data, { headers });
        console.log(response);
        return response;  
    }
}
