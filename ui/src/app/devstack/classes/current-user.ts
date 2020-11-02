// This code is thanks to following nice article.
// https://www.g33kchris.net/blog/using-react-context-to-manage-state

export interface UserState {
  isLoggedIn: boolean;
  username: string;
  permission: {};
  accessToken: string;
}
export const currentUser: UserState = {
  isLoggedIn: false,
  username: '',
  permission: {},
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
  isLoggedIn: false, username: '', permission: {}, accessToken: ''
}, action: UserStateAction): UserState {
  switch(action.type) {
    case UserStateActionTypes.LOGGED_IN: {
        return action.payload;
    }
    case UserStateActionTypes.LOGGED_OUT: {
        return {
          isLoggedIn: false,
          username: '',
          permission: {},
          accessToken: ''
        };
    }
    default:
        return {
          isLoggedIn: false,
          username: '',
          permission: {},
          accessToken: ''
        };
  }
}


// export default class CurrentUser {
//   public loggedIn: boolean;
//   public onChange: any;
//   public username: string;

//   constructor(onChange: any){
//     this.loggedIn = false;
//     this.username = '',
//     this.onChange = onChange
//     this.logIn = this.logIn.bind(this);
//   }

//   /**
//    * Log user into the web app
//    * @param  {string} email
//    * @param  {string} password
//    * @param  {function} success  callback
//    * @param  {function} fail     callback
//    * @return {void}
//    */
//   public logIn(): void {
//     // fake request
//     setTimeout(()=>{
//       this.setProperty(true)
//     },1500)
//   }

//   public isLoggedIn(){
//     return this.loggedIn === true
//   }
  
//   public setProperty(value: boolean){
//     this.loggedIn = value
//     // update func passed from app
//     // updates app state
//     this.onChange(this)
//   }
// }
