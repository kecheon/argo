import {UserService} from '../user-service';

describe('User service', () => {
    const userService = new UserService();
    it('can login with username and password', async () => {
        const loginResult = await userService.login('username', 'password');
        expect(loginResult.token).toBe('token_string');
    });
    it('can logout', async () => {
        const logoutResult = await userService.logout();
        console.log(logoutResult);
    });
    it('can get UserInfo with exact type matching', async () => {
        const result = await userService.get();
        expect(result.loggedIn).toBeDefined();
    });
});
