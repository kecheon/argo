import axios from 'axios';
const endpoint = 'http://183.111.177.141/identity/v3';
describe('API access', () => {
    it('get unscoped token by username and password', async () => {
        const data = {
            auth: {
                identity: {
                    methods: ['password'],
                    password: {
                        user: {name: 'admin', domain: {id: 'default'}, password: 'devstack'}
                    }
                }
            }
        };
        const url = `${endpoint}/auth/tokens`;

        const response = await axios.post(url, data);
        expect(response.status).toEqual(201);
        expect(response.headers['x-subject-token'].length > 0).toBeTruthy();
    });
    it('can login via local rest API', async () => {
        const url = 'http://localhost:5000/auth/login';
        const response = await axios.post(url, { email: 'admin@devstack.co.kr', password: 'devstack' });
        expect(response.status).toEqual(200);
        expect(response.data.status).toEqual('success');
        expect(response.data.Authorization.length > 0 ).toBeTruthy();
    })
});
