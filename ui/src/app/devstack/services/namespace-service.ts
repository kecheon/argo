import axios from 'axios';
import namespacesList from './__mocks__/namespaces';
// import { UsersList } from '../users/components/users-list/users-list';
const gatewayEndpoint = 'http://localhost:5000';
// const keystoneEndPoint = 'http://183.111.177.141/identity/v3';
import {NamespaceForm} from '../users/components/namespaces/components/create-namespace/create-namespace';

export class NamespaceService {
    public async get(): Promise<any> {
        // get projects list if wf-admin
        const response = await axios.get(`${gatewayEndpoint}/api/v1/namespace`);
        return response.data;
    }
    public async delete(id: string): Promise<any> {
        const response = await axios.delete(`${gatewayEndpoint}/api/v1/namespace/${id}`);
        return { status: 'success', message: 'namespace deleted' }
    }
    public async create(data: NamespaceForm): Promise<any> {
        const response = await axios.post(`${gatewayEndpoint}/api/v1/namespace`, data);
        return { status: 'success', message: 'namespace created' }
    }
    public async update(data: NamespaceForm): Promise<any> {
        const response = await axios.put(`${gatewayEndpoint}/api/v1/namespace`, data);
        return { status: 'success', message: 'namespace created' }
    }
    public async getProfile(id: string): Promise<any> {
        const response = await axios.get(`${gatewayEndpoint}/api/v1/namespace/${id}`);
        return {
            'is_wf': true,
            'wf': {
                'k8s_ns': 'dl-inferencing',
                'quota_cpu': 10,
                'quota_ram': 16
            },
            'id': '978a647141a04db2a28c19eba924f6c0',
            'name': 'dl-inferencing',
            'domain_id': 'default',
            'description': 'inference',
            'enabled': true,
            'parent_id': 'default',
            'is_domain': false,
            'tags': [],
            'options': {},
            'links': {
                'self': 'http://183.111.177.141/identity/v3/projects/978a647141a04db2a28c19eba924f6c0'
            }
        };
    }
}
