export interface UserState {
    loggedIn: boolean;
    username: string;
    permission: {};
    accessToken: string;
}

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

interface LogInAction {
    type: typeof LOG_IN;
    payload: UserState;
}

interface LogOutAction {
    type: typeof LOG_OUT;
}

export type UserStateActionTypes = LogInAction | LogOutAction;
