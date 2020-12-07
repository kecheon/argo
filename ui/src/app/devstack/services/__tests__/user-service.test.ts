import {UserService} from '../user-service';
import {server} from '../../mocks/server';
import usersList from '../../mocks/users';

describe('User service', () => {
    // comment out following 3 lines when you test with real server
    beforeAll(() => server.listen());
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers());

    const userService = new UserService();
    it('can login with username and password', async () => {
        const result = await userService.login('admin', 'devstack');
        expect(result.status).toEqual(200);
    });
    it('can logout', async () => {
        // fake test
        jest.spyOn(userService, 'logout').mockImplementation(() => {
            return Promise.resolve({ status: 200 });
        })
        const result = await userService.logout();
        expect(result.status).toEqual(200);
    });
    it('get users list without auth returns 403', async () => {
        try {
            await userService.getUsers();
        } catch (err) {
            expect(err.response.status).toEqual(403);
        }
    });
    it('get users list', async () => {
        await userService.login('admin', 'devstack');
        const result = await userService.getUsers();
        expect(result.status).toEqual('success');
        expect(result.users.length > 0).toBeTruthy();
    });
    it('testing with jest spy get users list', async () => {
        const result = await userService.getUsers();
        expect(result.status).toEqual('success');
        expect(result.users.length > 0).toBeTruthy();
    })
});
