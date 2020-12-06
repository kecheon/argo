
const userInfo = {
    loggedIn: true,
    username: 'devstack',
    iss: 'some_iss',
    groups: ['devstack1', 'devstack2']
};

export class UserService {
    public login = jest.fn(() => Promise.resolve({
        status: 'success',
        data: userInfo,
        headers: { 'x-subject-token': 'unscoped_token_string'}
    }));
    public register = jest.fn(() => Promise.resolve({data: {token: 'token_string'}}));
    public logout = jest.fn(() => Promise.resolve({
        status: 'success',
        data: {message: 'logout ok'}
    }));
    public getUsers = jest.fn(() => Promise.resolve({
        status: 'success',
        data: []
    }));
}
