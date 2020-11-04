import {UserService} from '../user-service';
// jest.mock('../user-service');
describe('User service', () => {
    const userService = new UserService();
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        // jest.resetAllMocks();
    });
    it('can login with username and password', async () => {
        const result = await userService.login('admin@devstack.co.kr', 'devstack');
        expect(result.status).toEqual('success');
    });
    xit('can logout', async () => {
        const result = await userService.logout();
        expect(result.status).toEqual('success');
    });
    it('get users list', async () => {
        const result = await userService.getUsers();
        expect(result.users.length > 0).toBeTruthy();
    })
});
