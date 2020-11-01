import axios from 'axios';
import {UserInfo} from '../../shared/models';
const keystoneEndPoint = 'http://localhost:5000/api';
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

    public async logout(): Promise<boolean> {
        const response = await axios.delete(`${keystoneEndPoint}/auth`);
        return response.data;
    }

    public async get(): Promise<UserInfo> {
        const response = await axios.get('/api/v1/auth/userinfo', {params: {token: 'token_string'}});
        return response.data as UserInfo;
    }
    public async register(userProfile: object): Promise<UserInfo> {
        const response = await axios.post('/api/v1/auth/register', userProfile);
        return response.data as UserInfo;
    }
}
