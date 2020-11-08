import axios from 'axios';
import {UserInfo} from '../../shared/models';
import usersList from './__mocks__/users';
// import { UsersList } from '../users/components/users-list/users-list';
const keystoneEndPoint = 'http://183.111.177.141:5000/api';
// const keystoneEndPoint = 'http://183.111.177.141/identity/v3';

export class UserService {
    public async login(username: string, password: string): Promise<any> {
        // const reqBody = {
        //     auth: {
        //         identity: {
        //             methods: ['password'],
        //             password: {
        //                 user: {
        //                     name: username,
        //                     domain: {id: 'default'},
        //                     password
        //                 }
        //             }
        //         }
        //     }
        // };
        // const response = await axios.post(`${keystoneEndPoint}/auth/tokens`, reqBody);
        const response = await axios.post(`${keystoneEndPoint}/auth/login`, { email: username, password });
        return response.data;
    }

    public async logout(): Promise<any> {
        const response = await axios.post(`${keystoneEndPoint}/auth/logout`);
        return response.data;
    }

    public async get(): Promise<UserInfo> {
        const response = await axios.get('/api/v1/auth/userinfo', {params: {token: 'token_string'}});
        return response.data as UserInfo;
    }
    public async register(userProfile: object): Promise<any> {
        const response = await axios.post(`${keystoneEndPoint}/user`, userProfile);
        return response.data;
    }
    public async getUsers(): Promise<any> {
        return usersList;
    }
    public async getProfile(link: string): Promise<any> {
        return {'is_wf': true, 'wf': {'k8s-sa': 'dl-inferer'}, 'email': 'dl-inferer@dl.com', 'description': 'dl-inferer', 'id': '5f29308913f946d5a6b88b6a4c806f02', 'name': 'dl-inferer', 'domain_id': 'default', 'enabled': true, 'default_namespace_id': '978a647141a04db2a28c19eba924f6c0', 'password_expires_at': 'null', 'options': {'lock_password': false}, 'links': {'self': 'http://183.111.177.141/identity/v3/users/5f29308913f946d5a6b88b6a4c806f02'}};
    }
    public async delete(link: string): Promise<any> {
        return { status: 'success', message: 'user deleted' }
    }
}
