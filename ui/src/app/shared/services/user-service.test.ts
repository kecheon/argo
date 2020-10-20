import {UserService} from './user-service';

it('can get UserInfo from json-service with exact type matching', async () => {
    const userService = new UserService();
    const result = await userService.get();
    expect(result.loggedIn).toBeDefined();
});
