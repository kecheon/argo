const userInfo = {
    loggedIn: true,
    username: 'devstack',
    iss: 'some_iss',
    groups: ['devstack1', 'devstack2']
};

export const UserService = {
    login: jest.fn(() => Promise.resolve({data: userInfo})),
    register: jest.fn(() => Promise.resolve({data: {token: 'token_string'}})),
    logout: jest.fn(() => Promise.resolve({data: {message: 'logout ok'}}))
};
