import axios from 'axios';
import {UserInfo} from '../../shared/models';
import userProfile from './__mocks__/user-profile';
import listOfUsers from './__mocks__/users';
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
    public async register(userProfileData: object): Promise<any> {
        const response = await axios.post(`${keystoneEndPoint}/user`, userProfileData);
        return response.data;
    }
    public async getUsers(): Promise<any> {
        // const response = await axios.get(`${keystoneEndPoint}/users/list`)
        return { status: 'success', users: listOfUsers };
    }
    public async getProfile(link: string): Promise<any> {
        return userProfile;
    }
    public async delete(link: string): Promise<any> {
        return { status: 'success', message: 'user deleted' }
    }
}
