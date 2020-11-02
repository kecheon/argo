import {LOG_IN, LOG_OUT, UserState, UserStateActionTypes} from './types';

const initialUserState: UserState = {
    loggedIn: false,
    username: 'anonymous',
    permission: {},
    accessToken: ''
};

export default function reducer(state = initialUserState, action: UserStateActionTypes) {
    if (action.type === LOG_IN) {
        const {loggedIn, username, permission, accessToken} = action.payload;
        return {
            ...state,
            loggedIn,
            username,
            permission,
            accessToken
        };
    } else if (action.type === LOG_OUT) {
        return {
            ...state,
            loggedIn: false,
            username: 'anonymous',
            permission: {},
            accessToken: ''
        };
    } else {
        return state;
    }
}
