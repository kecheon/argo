import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {UserService} from '../user-service';
import usersList from '../__mocks__/users';

const keystoneEndPoint = 'http://183.111.177.141:5000/api';
const handlers = [
    rest.post(`${keystoneEndPoint}/auth/login`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({status: 'success'})
        )
    }),
    rest.post(`${keystoneEndPoint}/auth/logout`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({status: 'success'})
        )
    }),
    rest.get(`${keystoneEndPoint}/users/list`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 'success',
                users: usersList.users
            })
        )
    }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterAll(() => server.close())
afterEach(() => server.resetHandlers());

describe('User service', () => {
    const userService = new UserService();
    beforeEach(() => {
    });
    it('can login with username and password', async () => {
        const result = await userService.login('admin@devstack.co.kr', 'devstack');
        expect(result.status).toEqual('success');
    });
    it('can logout', async () => {
        const result = await userService.logout();
        expect(result.status).toEqual('success');
    });
    it('get users list', async () => {
        const result = await userService.getUsers();
        expect(result.status).toEqual('success');
        expect(result.users.length > 0).toBeTruthy();
    })
});
