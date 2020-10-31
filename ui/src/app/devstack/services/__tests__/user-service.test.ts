import {UserService} from '../user-service';
jest.mock('../user-service');
describe('User service', () => {
    const userService = new UserService();
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.resetAllMocks();
    });
    it('can login with username and password', async () => {
        expect.assertions(1)
        const result = await userService.login('admin', 'devstack');
        // expect(userService.login).toHaveBeenCalledWith('admin', 'devstack');
        expect(result.headers['x-subject-token'].length > 0).toBeTruthy();
    });
    it('can logout', async () => {
        await userService.logout();
        expect(userService.logout).toHaveBeenCalled();
    });
    // it('can get UserInfo with exact type matching', async () => {
    //     const result = await userService.get();
    //     expect(result.loggedIn).toBeDefined();
    // });
    // it('can register', async () => {
    //     const userProfile = {username: 'devstack', password: 'somesecret'};
    //     await userService.register(userProfile);
    //     const result = await userService.get();
    //     expect(result.username).toBeDefined();
    // });
});
