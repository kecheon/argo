import { rest } from 'msw';
import usersList from './users';

const keystoneEndPoint = 'http://localhost:3000';

class LocalStorage {
  constructor() {
    this.store = {
      isLoggedIn: false,
    };
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value;
  }
  clear(key) {
    delete this.store[key];
  }
};
const localStorage = new LocalStorage();

export const handlers = [
    rest.post(`${keystoneEndPoint}/account/login`, (req, res, ctx) => {
      console.log(req);
        localStorage.setItem('isLoggedIn', true);
        return res(
            ctx.status(200),
            ctx.json({status: 'success'})
        )
    }),
    rest.get(`${keystoneEndPoint}/account/logout`, (req, res, ctx) => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        return res(
            ctx.status(200),
            ctx.json({status: 'success'})
        )
    }),
    rest.get(`${keystoneEndPoint}/users/link`, () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        return res(
          ctx.status(403),
          ctx.json({
            errorMessage: 'Not Authorized'
          })
        )
      }
      return res(
        ctx.status(200),
        ctx.json({
          username: 'admin',
        })
      )
    }),
    rest.get(`${keystoneEndPoint}/users`, (req, res, ctx) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
          return res(
            ctx.status(403),
            ctx.json({
              errorMessage: 'Not Authorized'
            })
          )
        } else {
          return res(
              ctx.status(200),
              ctx.json({
                  status: 'success',
                  users: usersList.users
              })
          )
        }
    }),
];
