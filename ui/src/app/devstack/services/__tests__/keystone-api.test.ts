import axios from 'axios';
const endpoint = 'http://183.111.177.141/identity/v3';
<<<<<<< HEAD

xdescribe('API access', () => {
    it('get unscoped token by username and password', async done => {
=======
describe('API access', () => {
    it('get unscoped token by username and password', async () => {
>>>>>>> 122b46ff... keystone auth test with username, password ok; CORS error was from node
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
});
