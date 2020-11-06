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
}
