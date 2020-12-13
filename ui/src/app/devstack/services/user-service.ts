import axios from 'axios';
import {UserInfo} from '../../shared/models';
// import userProfile from '../mocks/user-profile';
// import listOfUsers from './__mocks__/users';
// import { UsersList } from '../users/components/users-list/users-list';
// const keystoneEndPoint = 'http://183.111.177.141:5000/api';
// const keystoneEndPoint = 'http://183.111.177.141/identity/v3';
import {endpoint} from '../../devstack/classes/constants';
const accessToken = localStorage.getItem('accessToken');
const headers = {
   Authorization: `Bearer ${accessToken}` 
}
export class UserService {
    public async login(username: string, password: string): Promise<any> {
        const response = await axios.post(`${endpoint}/account/login`, { username, domainId: 'default', password });
        if (response.status === 302) {
            return { status: 'success' };
        } else {
            return { status: 'failure' };
        }
    }

    public async logout(): Promise<any> {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        await axios.get(`${endpoint}/account/logout`);
    }

    // public async get(): Promise<UserInfo> {
    //     const response = await axios.get('/api/v1/auth/userinfo');
    //     return response.data as UserInfo;
    // }
    public async register(userProfileData: object): Promise<any> {
        const response = await axios.post(`${endpoint}/user`, userProfileData, { headers });
        return response.data;
    }
    public async getUsers(): Promise<any> {
        const response = await axios.get(`${endpoint}/user`, { headers });
        console.log(response);
        return response.data;
    }
    public async getUserProfile(id: string): Promise<any> {
        const response = await axios.get(`${endpoint}/user/${id}`, { headers })
        return response.data as UserInfo;
        // return getAsyncData(userProfile);
    }
    public async updateUser(id: string, data: UserInfo): Promise<any> {
        const response = await axios.patch(`${endpoint}/user/${id}`, data, { headers })
        return response.data as UserInfo;
        // return getAsyncData(userProfile);
    }
    public async deleteUser(id: string): Promise<any> {
        const response = await axios.delete(`${endpoint}/user/${id}`, { headers })
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
