export default class CurrentUser {
  public loggedIn: boolean;
  public onChange: any;
  public username: string;

  constructor(onChange: any){
    this.loggedIn = false;
    this.username = '',
    this.onChange = onChange
    this.logIn = this.logIn.bind(this);
  }

  /**
   * Log user into the web app
   * @param  {string} email
   * @param  {string} password
   * @param  {function} success  callback
   * @param  {function} fail     callback
   * @return {void}
   */
  public logIn(): void {
    // fake request
    setTimeout(()=>{
      this.setProperty(true)
    },1500)
  }

  public isLoggedIn(){
    return this.loggedIn === true
  }
  
  public setProperty(value: boolean){
    this.loggedIn = value
    // update func passed from app
    // updates app state
    this.onChange(this)
  }
}
