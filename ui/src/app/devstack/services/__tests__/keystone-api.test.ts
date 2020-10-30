import axios from 'axios';
const endpoint = 'http://183.111.177.141/identity/v3';

describe('API access', () => {
    it('get unscoped token by username and password', async done => {
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
    });
});
