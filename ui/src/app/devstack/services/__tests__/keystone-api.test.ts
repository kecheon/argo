import axios from 'axios';
const endpoint = 'http://183.111.177.141/identity/v3';
describe('Keystone API access', () => {
    it('get access token from Keystone ', async () => {

        // 1. get unscoped token by username and password
        const username = 'admin';
        const password = 'devstack';
    
        const data = {
            auth: {
                identity: {
                    methods: ['password'],
                    password: {
                        user: {name: username, domain: {id: 'default'}, password}
                    }
                }
            }
        };
        const url = `${endpoint}/auth/tokens`;

        const response = await axios.post(url, data);
        expect(response.status).toEqual(201);
        const token = response.headers['x-subject-token']
        expect(token.length > 0).toBeTruthy();
        console.log(token)

        // 2. get project list with unscoped access token
        const projectListEndPoint = `${endpoint}/auth/projects`;
        const headers = {
            headers: { 
                'X-Auth-Token': token
            }
        }
        const prjListResponse = await axios.get(projectListEndPoint, headers);
        const { projects }= prjListResponse.data;
        expect(projects.length > 0).toBeTruthy();
        console.log(projects)

        // 3. get project scoped token
        const prjScopedTokenEndPoint = `${endpoint}/auth/tokens`;
        const authData = {
            'auth': {
                'identity': {
                    'methods': ['token'],
                    'token': { 'id': token }
                },
                'scope': {
                    'project': {
                        'id': projects[0].id
                    }
                }
            }
        }
        const authHeaders = { 
          'X-Auth-Token': token,
          'Content-Type': 'application/json'
        }
        const prjTokenResponse = await axios.post(prjScopedTokenEndPoint, authData, {headers: authHeaders});
        expect(prjTokenResponse.data.token).not.toBeNull();
        console.log(prjTokenResponse.data);
    });
    it('can login via local rest API', async () => {
        const url = 'http://183.111.177.141:5000/api/auth/login';
        const response = await axios.post(url, { email: 'admin@devstack.co.kr', password: 'devstack' });
        expect(response.status).toEqual(200);
        expect(response.data.status).toEqual('success');
        expect(response.data.Authorization.length > 0 ).toBeTruthy();
    })
});
