import {AuthSettings} from '../../shared/models';
import requests from '../../shared/services/requests';

export class AuthService {
    public settings(): Promise<AuthSettings> {
        return requests.get('/settings').then(res => res.body as AuthSettings);
    }
}
