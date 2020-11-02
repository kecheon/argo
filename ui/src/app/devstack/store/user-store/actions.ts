import {LOG_IN, LOG_OUT, UserState} from './types';

export const logIn = (user: UserState) => ({
    type: LOG_IN,
    payload: {
        user
    }
});

export const logOut = () => ({
    type: LOG_OUT
});
