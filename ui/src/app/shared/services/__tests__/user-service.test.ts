import {UserService} from '../user-service';

it('can get UserInfo with exact type matching', async () => {
    const userService = new UserService();
    const result = await userService.get();
    console.log(result);
    expect(result.loggedIn).toBeDefined();
});
