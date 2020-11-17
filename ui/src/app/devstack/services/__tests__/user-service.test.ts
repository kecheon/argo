import {UserService} from '../user-service';
import {server} from '../../mocks/server';
import usersList from '../../mocks/users';

describe('User service', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers());

    const userService = new UserService();
    it('can login with username and password', async () => {
        const result = await userService.login('admin@devstack.co.kr', 'devstack');
        expect(result.status).toEqual('success');
    });
    it('can logout', async () => {
        const result = await userService.logout();
        expect(result.status).toEqual('success');
    });
    it('get users list without auth returns 403', async () => {
        try {
            await userService.getUsers();
        } catch (err) {
            expect(err.response.status).toEqual(403);
        }
    });
    it('get users list', async () => {
        await userService.login('admin@devstack.co.kr', 'devstack');
        const result = await userService.getUsers();
        expect(result.status).toEqual('success');
        expect(result.users.length > 0).toBeTruthy();
    });
    it('testing with jest spy get users list', async () => {
        jest.spyOn(userService, 'getUsers').mockImplementation(() => {
            return Promise.resolve({ users: usersList.users, status: 'success' });
        })
        const result = await userService.getUsers();
        expect(result.status).toEqual('success');
        expect(result.users.length > 0).toBeTruthy();
    })
});
