import {UserInfo} from '../models';
import requests from './requests2';

export class UserService {
    public login(username: string, password: string): Promise<{token: string}> {
        return requests
            .post('/session')
            .send({username, password})
            .then(res => ({token: res.body.token}));
    }

    public logout(): Promise<boolean> {
        return requests.delete('/session').then(() => true);
    }

    public get(): Promise<UserInfo> {
        return requests.get('/session/userinfo').then(res => res.body as UserInfo);
    }
}
