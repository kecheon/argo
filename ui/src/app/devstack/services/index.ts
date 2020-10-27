import {AuthService} from './auth-service';
import {UserService} from './user-service';

export interface Services {
    users: UserService;
    authService: AuthService;
}

export const services: Services = {
    users: new UserService(),
    authService: new AuthService()
};
