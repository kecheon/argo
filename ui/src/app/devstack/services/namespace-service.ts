// import axios from 'axios';
import namespacesList from './__mocks__/namespaces';
// import { UsersList } from '../users/components/users-list/users-list';
// const keystoneEndPoint = 'http://localhost:5000/api';
// const keystoneEndPoint = 'http://183.111.177.141/identity/v3';
import {NamespaceForm} from '../users/components/namespaces/components/create-namespace/create-namespace';

export class NamespaceService {
    public async get(): Promise<any> {
        // const response = await axios.get('/api/v1/auth/userinfo', {params: {token: 'token_string'}});
        // return response.data as Namespace;
        return namespacesList.namespaces;
    }
    public async delete(link: string): Promise<any> {
        return { status: 'success', message: 'namespace deleted' }
    }
    public async create(data: NamespaceForm): Promise<any> {
        return { status: 'success', message: 'namespace created' }
    }
    public async getProfile(link: string): Promise<any> {
        // tslint:disable-next-line: max-line-length
        return {'is_wf': true, 'wf': {'k8s_ns': 'dl-inferencing', 'quota_cpu': 10, 'quota_ram': 16}, 'id': '978a647141a04db2a28c19eba924f6c0', 'name': 'dl-inferencing', 'domain_id': 'default', 'description': 'inference', 'enabled': true, 'parent_id': 'default', 'is_domain': false, 'tags': [], 'options': {}, 'links': {'self': 'http://183.111.177.141/identity/v3/projects/978a647141a04db2a28c19eba924f6c0'}};
    }
}
