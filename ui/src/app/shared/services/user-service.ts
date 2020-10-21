import axios from "axios";
import {UserInfo} from '../models';

export class UserService {
    // public login(username: string, password: string): Promise<{token: string}> {
    //     return requests
    //         .post('/session')
    //         .send({username, password})
    //         .then(res => ({token: res.body.token}));
    // }

    // public logout(): Promise<boolean> {
    //     return requests.delete('/session').then(() => true);
    // }

    public async get(): Promise<UserInfo> {
        const response = await axios.get('/api/v1/auth/userinfo');
        return response.data as UserInfo;
    }
}
