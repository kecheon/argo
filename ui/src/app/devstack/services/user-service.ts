import axios from 'axios';
import {UserInfo} from '../../shared/models';
// import userProfile from '../mocks/user-profile';
// import listOfUsers from './__mocks__/users';
// import { UsersList } from '../users/components/users-list/users-list';
// const keystoneEndPoint = 'http://183.111.177.141:5000/api';
// const keystoneEndPoint = 'http://183.111.177.141/identity/v3';
const gatewayEndpoint = 'http://localhost:3000';

export class UserService {
    public async login(username: string, password: string): Promise<any> {
        const response = await axios.post(`${gatewayEndpoint}/account/login`, { username, domainId: 'default', password });
        return response;
    }

    public async logout(): Promise<any> {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        const response = await axios.get(`${gatewayEndpoint}/account/logout`);
        return response;
    }

    public async get(): Promise<UserInfo> {
        const response = await axios.get('/api/v1/auth/userinfo', {params: {token: 'token_string'}});
        return response.data as UserInfo;
    }
    public async register(userProfileData: object): Promise<any> {
        const response = await axios.post(`${gatewayEndpoint}/users`, userProfileData);
        return response.data;
    }
    public async getUsers(): Promise<any> {
        const response = await axios.get(`${gatewayEndpoint}/users`);
        return response.data;
    }
    public async getUserProfile(link: string): Promise<any> {
        const response = await axios.get(`${gatewayEndpoint}/users/link`)
        return response.data;
        // return getAsyncData(userProfile);
    }
    public async updateUser(link: string): Promise<any> {
        const response = await axios.put(`${gatewayEndpoint}/users/link`)
        return response.data;
        // return getAsyncData(userProfile);
    }
    public async deleteUser(link: string): Promise<any> {
        const response = await axios.delete(`${gatewayEndpoint}/users/link`)
        return response.data;
        // return { status: 'success', message: 'user deleted' }
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getAsyncData(data: any) {
    await sleep(1000);
    return data;
}
