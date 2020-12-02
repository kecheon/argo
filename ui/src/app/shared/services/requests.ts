import {Observable, Observer} from 'rxjs';
import * as _superagent from 'superagent';
import {SuperAgentRequest} from 'superagent';
import {apiUrl, uiUrl} from '../base';
import {argoToken} from '../../devstack/classes/constants';

const superagentPromise = require('superagent-promise');
// const default_token ='Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlAxdWFIREZHdVlBLTRsdXFwc0NGQW5tTXpfSGNzSjBxRm43Vk41ekJWak0ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJhcmdvIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tcTJuNWciLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImY2YzA0ZmU0LTY2YjYtNDNhOS04Y2JmLWE0OGNhMmRlZGVkMiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDphcmdvOmRlZmF1bHQifQ.NwkuwwnnGhuqKCRa0exxogi5yqyj1eJDJ25bGNG_NjnFXZ-e2ySqWdJYrgGdsSNEkvFYkNt6O5R03lZEarR2hJxauwzkK4YxzjtkybjKYpRkw5nonuotpU4jD-badsqXTQYgv4j5xXCmZ-MtJp_M1UW5tSfVPRa86vGOrtTULLF8DBh86KcQYNkH2ry4VK6ZL-smrtEl1iwO576uFKQF3TWaZD6p5jLRldVJzCCSVk187U1VifbJSzt-BK5U3z3IrVGgJKzpY2tqZYf208m4wGu3-lne_ZoX72-NkV-0rgb_Tg-xOhhX_mWeHRAUz0B7BnvR34d8cQG4NJIxPAv0bA';
// const saToken ='Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlAxdWFIREZHdVlBLTRsdXFwc0NGQW5tTXpfSGNzSjBxRm43Vk41ekJWak0ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJhcmdvIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFyZ28tdG9rZW4tMnZ3ODciLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiYXJnbyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImM0YTgyZTlmLTVjNDAtNDlhMy1iZjc0LTMyYzMxNDhiMzE0NCIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDphcmdvOmFyZ28ifQ.17_eKQ8BmRf-KghYKB8u9mU-t6nKDR4VzTmed8eKtfeMFcZse1Ol16NYNP7MRJ5dEy1DLFWwn238jbnxn83Tsl6kQtzaFD-OksD-BKZEtvzvyJXKkuHNRdF2l5J8rHqn6ltN4e3xAoYQXT7jZXTGLY6SaOBhpoyRllPVdsJwHPOeCU9xNezKIX6Lnd_F2ScVa99xjIEvv6Pm1Y_g5W32peFvqqdtRJTtULDkKCVM8jThsy16HTw1_jnEiHEAabVC-pF5KpBcR2hL3IjSXsYYLim2qA-47pgZAVLqLLTed6GVSvc4Y_e5NlVQ9uGz9km3rKlJHaguPzcwnhUndgvn5Q';

const auth = (req: SuperAgentRequest) => {
    req.set('Authorization', argoToken);
    return req.on('error', handle);
};

const handle = (err: any) => {
    // check URL to prevent redirect loop
    if (err.status === 401 && !document.location.href.endsWith('login')) {
        document.location.href = uiUrl('login');
    }
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
