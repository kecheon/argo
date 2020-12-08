import {Observable, Observer} from 'rxjs';
import * as _superagent from 'superagent';
import {SuperAgentRequest} from 'superagent';
import {apiUrl, uiUrl} from '../base';
// import {argoToken} from '../../devstack/classes/constants';
const superagentPromise = require('superagent-promise');

const auth = (req: SuperAgentRequest) => {
    // const accessToken = localStorage.getItem('accessToken');
    // req.set('Authorization', `Bearer ${accessToken}`);
    // req.set('Authorization', argoToken);
    return req.on('error', handle);
};

const handle = (err: any) => {
    // check URL to prevent redirect loop
    console.log(err);
    // if (err.status === 401 && !document.location.href.endsWith('login')) {
    //     document.location.href = uiUrl('login');
    // }
};

const superagent: _superagent.SuperAgentStatic = superagentPromise(_superagent, global.Promise);

export default {
    get(url: string) {
        return auth(superagent.get(apiUrl(url)));
    },

    post(url: string) {
        return auth(superagent.post(apiUrl(url)));
    },

    put(url: string) {
        return auth(superagent.put(apiUrl(url)));
    },

    patch(url: string) {
        return auth(superagent.patch(apiUrl(url)));
    },

    delete(url: string) {
        return auth(superagent.del(apiUrl(url)));
    },

    loadEventSource(url: string): Observable<string> {
        return Observable.create((observer: Observer<any>) => {
            const eventSource = new EventSource(url);
            eventSource.onmessage = x => observer.next(x.data);
            eventSource.onerror = x => observer.error(x);
            return () => {
                eventSource.close();
            };
        });
    }
};
