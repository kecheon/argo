// This code is thanks to following nice article.
// https://www.g33kchris.net/blog/using-react-context-to-manage-state

export interface UserState {
  isLoggedIn: boolean;
  username: string;
  role: {name: '', level: 4};
  accessToken: string;
}
export const currentUser: UserState = {
  isLoggedIn: false,
  username: '',
  role: {
    name: '',
    level: 4
  },
  accessToken: ''
}

export interface UserStateAction {
  type: string;
  payload: any;
}

export const UserStateActionTypes = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT'
}

export function userStateReducer(state: UserState = {
  isLoggedIn: false, username: '', role: {name: '', level: 4}, accessToken: ''
}, action: UserStateAction): UserState {
  switch(action.type) {
    case UserStateActionTypes.LOGGED_IN: {
        return action.payload;
    }
    case UserStateActionTypes.LOGGED_OUT: {
        return {
          isLoggedIn: false,
          username: '',
          role: {
            name: '',
            level: 4
          },
          accessToken: ''
        };
    }
    default:
        return {
          isLoggedIn: false,
          username: '',
          role: {
            name: '',
            level: 4
          },
          accessToken: ''
        };
  }
}
