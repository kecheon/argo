import {GetUserInfoResponse, Info, Version} from '../../../models';

import requests from './requests';

export class InfoService {
    public getInfo() {
        return requests.get(`argo/info`).then(res => res.body as Info);
    }

    public getVersion() {
        return requests.get(`argo/version`).then(res => res.body as Version);
    }

    public getUserInfo() {
        return requests.get(`argo/userinfo`).then(res => res.body as GetUserInfoResponse);
    }
}
